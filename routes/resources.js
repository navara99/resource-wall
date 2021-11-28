const express = require('express');
const router = express.Router();
const queryGenerator = require("../db/query-helpers");

module.exports = (db) => {
  const { addNewResource } = queryGenerator(db);

  router.get("/", (req, res) => {

  });

  router.post("/", async (req, res) => {
    const user_id = req.session.user_id;
    let { is_private } = req.body;

    is_private = is_private ? true : false;

    const newResourceInput = { ...req.body, is_private, user_id }
    const newResource = await addNewResource(newResourceInput);

    console.log(newResource);

    res.json(newResource);
  })

  return router;
};
