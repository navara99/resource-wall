const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const axios = require("axios");
const queryGenerator = require("../db/query-helpers");
const apiKey = process.env.IFRAME_KEY;

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
    addRatingToResource
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
      console.log(err.message);
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
        allResources
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/me", async (req, res) => {
    console.log("hi")
    try {
      const { user_id } = req.session;
      if (!user_id) return res.json({});
      const myResources = await getMyResources(user_id);
      res.json(myResources);
    } catch (err) {
      console.log(err.message);
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
      console.log(url);
      const encodeURL = encodeURIComponent(url);
      const api = `https://iframe.ly/api/iframely?url=${encodeURL}&api_key=${apiKey}`;
      const data = await axios.get(api);
      const html  = data.data.html;
      res.json({ html });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    const user_id = req.session.user_id;
    let { is_private, category, url } = req.body;
    let media_url;
    let is_video;

    if (!validUrl.isUri(url))
      return res.status(400).json({ error: "This url is not valid." });

    try {
      const encodedURI = encodeURIComponent(url);
      const videoData = await axios.get(
        `https://www.youtube.com/oembed?url=${encodedURI}&format=json`
      );
      const source = videoData.data.html
        .split(" ")
        .filter((attribute) => attribute.includes("src"))[0]
        .slice(4)
        .replace(`"`, "");
      media_url = source;
      is_video = true;
    } catch (e) {
      console.log(process.env.APIKEY);
      // media_url = "https://api.screenshotmachine.com/?key=506e0f&url=https://hipsum.co/?paras=5&type=hipster-centric&dimension=1024x768&zoom=200"
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
    console.log(id, user_id);

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
