const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const queryGenerator = require("../db/query-helpers");

module.exports = (db) => {
  const { getUserByEmail, createNewUser } = queryGenerator(db);

  router.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;

      const data = await getUserByEmail(email);
      const user = data.rows[0];

      if (!user) return res.status(400).json({ error: "email doesn't exist" });

      const { hashedPassword } = user;
      const correctPassword = bcrypt.compare(password, hashedPassword);

      if (!correctPassword) return res.status(400).json({ error: "email doesn't match with password" });

      req.session.user_id = user.id;
      res.json(user);

    } catch (err) {
      res.status(500).json({ error: err.message });
    };

  });

  router.post("/register", async (req, res) => {

    try {
      const { email, password } = req.body;

      const user = await getUserByEmail(email)[0];

      if (user) return res.status(400).json({ error: "email is already registered" });

      const hashedPassword = await bcrypt.hash(password, 12);
      const userInfo = { ...req.body, password: hashedPassword};

      const newUser = await createNewUser(userInfo);

      req.session.user_id = newUser.id;
      res.json(newUser);

    } catch (err) {
      res.status(500).json({ error: err.message });
    };

  });


  return router;
};
