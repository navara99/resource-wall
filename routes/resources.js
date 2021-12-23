const express = require("express");
const router = express.Router();
const { isUri } = require("valid-url");
const axios = require("axios");
const queryGenerator = require("../db/query-helpers");
const apiKey = process.env.IFRAME_KEY;
const providers = require("./json/providers.json");

const omebed = (url) => {
  for (const provider of providers) {
    const { endpoints, provider_url } = provider;
    const { schemes, url: oembedURL } = endpoints[0];
    const urlRegex2 = new RegExp(provider_url + "*");
    const matched = urlRegex2.test(url);
    if (matched) return oembedURL;
    if (schemes) {
      for (const str of schemes) {
        const urlRegex = new RegExp(str);
        const match = urlRegex.test(url);
        if (match) return oembedURL;
      }
    }
  }
};

module.exports = (db) => {
  const {
    addNewResource,
    getIdFromCategory,
    getAllResources,
    getUserResources,
    searchResources,
    addLikeToResource,
    getAllDetailsOfResource,
    addCommentToResource,
    getURLById,
    addRatingToResource,
    getResourcesByCategory,
    deleteResource,
    updateResource
  } = queryGenerator(db);

  router.get("/", async (req, res) => {
    const user_id = req.session.user_id;
    try {
      const allResources = await getAllResources(user_id);

      res.json({
        status: "success",
        allResources,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/category/:catName", async (req, res) => {
    const { catName } = req.params;
    const { user_id } = req.session;

    try {
      const resourceByCategory = await getResourcesByCategory(user_id, catName);

      res.json({
        status: "success",
        resourceByCategory,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/search/:q", async (req, res) => {
    const { q } = req.params;
    const { user_id } = req.session;

    try {
      const allResources = await searchResources(user_id, q);

      res.json({
        status: "success",
        allResources,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const { user_id } = req.session;

    const id = parseInt(userId) || user_id;

    try {
      const resources = await getUserResources(id);

      res.json({ resources, id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    const { user_id } = req.session;
    const { id } = req.params;

    try {
      const resourceDetails = await getAllDetailsOfResource(id, user_id);

      res.json(resourceDetails);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { user_id } = req.session;
    const { id } = req.params;

    try {
      const result = await getAllDetailsOfResource(id, user_id);
      const { user_id: owner_id } = result[0];

      if (user_id !== owner_id) return res.status(401).json({ status: "fail" });
      await deleteResource(id);

      res.status(204).json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/media/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const url = await getURLById(id);
      const encodeURL = encodeURIComponent(url);

      const api = `https://iframe.ly/api/iframely?url=${encodeURL}&api_key=${apiKey}`;
      const {
        data: { html },
      } = await axios.get(api);

      res.json({ html });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    let { is_private, category, url } = req.body;
    is_private = is_private || false;

    const urlIsValid = isUri(url);
    if (!urlIsValid) {
      return res.status(400).json({ error: "This url is not valid." });
    }

    const user_id = req.session.user_id;
    const omebedUrl = omebed(url);
    const encodedURI = encodeURIComponent(url);
    let media_url;
    let is_video;

    try {
      const videoData = await axios.get(
        `${omebedUrl}?url=${encodedURI}&format=json`
      );
      const source = videoData.data.html
        .split(" ")
        .filter((attribute) => attribute.includes("src"))[0]
        .slice(4)
        .replace(`"`, "");

      media_url = source;
      is_video = true;
    } catch (e) {
      media_url = `https://api.screenshotmachine.com?key=${process.env.APIKEY}&url=${url}&dimension=1024x768&zoom=200`;
      is_video = false;
    }

    try {
      const category_id = await getIdFromCategory(category);
      const newResourceInput = {
        ...req.body,
        is_private,
        user_id,
        category_id,
        is_video,
        media_url,
      };

      const newResource = await addNewResource(newResourceInput);
      res.json(newResource);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    const { user_id } = req.session;
    const { id } = req.params;

    try {
      await updateResource(id, req.body);
      res.status(200).json({ status: "success" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }


  });

  router.post("/:id/like", async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.session;

    if (!user_id) {
      return res
        .status(500)
        .json({ error: "You must be logged in to like resources." });
    }

    try {
      const likes = await addLikeToResource(id, user_id);
      res.json(likes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/:id/comment", async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.session;
    const { comment } = req.body;

    try {
      const result = await addCommentToResource(id, user_id, comment);
      return res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/:id/rating", async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.session;
    const { rating } = req.body;

    try {
      const result = await addRatingToResource(id, user_id, rating);
      return res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
