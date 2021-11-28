const express = require('express');
const router = express.Router();
const queryGenerator = require("../db/query-helpers");

module.exports = (db) => {
  const { addNewResource, getIdFromCategory } = queryGenerator(db);

  router.get("/", (req, res) => {

  });

  router.post("/", async (req, res) => {
    try {
      const user_id = req.session.user_id;
      let { is_private, category } = req.body;
      
      is_private = is_private ? true : false;
      const category_id = await getIdFromCategory(category);
      const newResourceInput = { ...req.body, is_private, user_id, category_id }
      const newResource = await addNewResource(newResourceInput);
      res.json(newResource);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })

  return router;
};
