const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = 12;

const queryGenerator = require("../db/query-helpers");

module.exports = (db) => {
  const { createNewUser, getUserByValue, updateUser } = queryGenerator(db);

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

  router.post("/edit", async (req, res) => {

    try {
      const userId = req.session.user_id;
      const { username, email } = req.body;

      const userWithSameUsername = await getUserByValue("username", username);
      if (userWithSameUsername.rows[0]) return res.status(400).json({ error: "This username is already taken." });

      const userWithSameEmail = await getUserByValue("email", email);
      if (userWithSameEmail.rows[0]) return res.status(400).json({ error: "This email is already taken." });

      const newUserInfo = { userId, ...req.body };

      const updatedInfo = await updateUser(newUserInfo);

      res.json(updatedInfo.rows[0]);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
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
