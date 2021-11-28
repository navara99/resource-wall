const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = 12;

const queryGenerator = require("../db/query-helpers");

module.exports = (db) => {
  const { createNewUser, getUserByValue, updatePasswordById, updateUser } = queryGenerator(db);

  router.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;

      const user = await getUserByValue('email', email);
      // const c = data.rows[0];

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
      const { id: idWithSameUsername} = userWithSameUsername;
      if (userWithSameUsername && idWithSameUsername !== userId) return res.status(400).json({ error: "This username is already taken." });

      const userWithSameEmail = await getUserByValue("email", email);
      const { id: idWithSameEmail} = userWithSameEmail;
      if (userWithSameEmail && idWithSameEmail !== userId) return res.status(400).json({ error: "This email is already taken." });

      const newUserInfo = { userId, ...req.body };

      const updatedInfo = await updateUser(newUserInfo);

      res.json(updatedInfo);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/password", async (req, res) => {

    try {
      const { user_id } = req.session;
      const { current_password, new_password, confirm_new_password } = req.body;

      const user = await getUserByValue('id', user_id);

      const { password: hashedPassword } = user;

      const correctPassword = await bcrypt.compare(current_password, hashedPassword);

      if (!correctPassword) return res.status(400).json({ error: "current password is incorrect." });

      const newPasswordIsConfirmed = new_password === confirm_new_password;

      if (!newPasswordIsConfirmed) return res.status(400).json({ error: "different inputs for new password." });

      const newHashedPassword = await bcrypt.hash(new_password, salt);

      const newUserInfo = await updatePasswordById(user_id, newHashedPassword);

      res.json(newUserInfo);

    } catch (err) {
      res.status(500).json({ error: err.message });
    };

  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  router.post("/register", async (req, res) => {

    try {
      const { email, password, username } = req.body;

      const userWithSameUsername = await getUserByValue("username", username);

      if (userWithSameUsername) return res.status(400).json({ error: "This username is already taken." });

      const userWithSameEmail = await getUserByValue("email", email);

      if (userWithSameEmail) return res.status(400).json({ error: "This email is already taken." });

      const hashedPassword = await bcrypt.hash(password, salt);

      const userInfo = { ...req.body, password: hashedPassword };

      const newUser = await createNewUser(userInfo);

      req.session.user_id = newUser.id;
      res.json(newUser);

    } catch (err) {
      res.status(500).json({ error: err.message });
    };

  });


  return router;
};
