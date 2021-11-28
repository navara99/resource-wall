const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = 12;

const queryGenerator = require("../db/query-helpers");

module.exports = (db) => {
  const { createNewUser, getUserByValue } = queryGenerator(db);

  router.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;

      const data = await getUserByValue('email', email);
      const user = data.rows[0];

      if (!user) return res.status(400).json({ error: "email doesn't exist" });

      const { password: hashedPassword } = user;
      const correctPassword = await bcrypt.compare(password, hashedPassword);

      if (!correctPassword) return res.status(400).json({ error: "email doesn't match with password" });

      req.session.user_id = user.id;
      res.json(user);

    } catch (err) {
      res.status(500).json({ error: err.message });
    };

  });

  router.post("/update-profile", async (req, res) => {

  });

  router.post("/change-password", async (req, res) => {

  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  router.post("/register", async (req, res) => {

    try {
      const { email, password } = req.body;

      const user = await getUserByValue('email', email)[0];

      if (user) return res.status(400).json({ error: "email is already registered" });

      const hashedPassword = await bcrypt.hash(password, salt);

      const userInfo = { ...req.body, password: hashedPassword };

      const data = await createNewUser(userInfo);
      const { rows: newUsers } = data;
      const newUser = newUsers[0];

      req.session.user_id = newUser.id;
      res.json(newUser);

    } catch (err) {
      res.status(500).json({ error: err.message });
    };

  });


  return router;
};
