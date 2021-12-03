const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const axios = require("axios");
const queryGenerator = require("../db/query-helpers");
const apiKey = process.env.IFRAME_KEY;
const providers = require("./json/providers.json");

module.exports = (db) => {
  const {
    addNewResource,
    getIdFromCategory,
    getAllResources,
    getMyResources,
    searchResources,
    addLikeToResource,
    getAllDetailsOfResource,
    addCommentToResource,
    getURLById,
    addRatingToResource,
    getResourcesByCategory
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
        resourceByCategory
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }


  })

  router.get("/search/:q", async (req, res) => {
    const { q } = req.params;
    const { user_id } = req.session;

    try {
      const allResources = await searchResources(user_id, q);
      res.json({
        status: "success",
        allResources
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/me", async (req, res) => {

    try {
      const { user_id } = req.session;
      if (!user_id) return res.json({});
      const myResources = await getMyResources(user_id);
      res.json(myResources);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

  });

  router.get("/:id", async (req, res) => {
    try {
      const { user_id } = req.session;
      const { id } = req.params;
      const resourceDetails = await getAllDetailsOfResource(id, user_id);
      res.json(resourceDetails);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/media/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const url = await getURLById(id);
      const encodeURL = encodeURIComponent(url);
      const api = `https://iframe.ly/api/iframely?url=${encodeURL}&api_key=${apiKey}`;
      const data = await axios.get(api);
      const html = data.data.html;
      res.json({ html });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

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
  }

  router.post("/", async (req, res) => {
    const user_id = req.session.user_id;
    let { is_private, category, url } = req.body;
    let media_url;
    let is_video;

    if (!validUrl.isUri(url))
      return res.status(400).json({ error: "This url is not valid." });

    const omebedUrl = omebed(url);

    try {
      const encodedURI = encodeURIComponent(url);
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
      media_url = `https://api.screenshotmachine.com?key=${process.env.APIKEY}&url=${url}&dimension=1024x768&zoom=200`
      is_video = false;
    }

    try {
      is_private = is_private ? true : false;
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

  router.post("/:id/like", async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.session;

    if (!user_id)
      return res
        .status(500)
        .json({ error: "You must be logged in to like resources." });

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
