const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const values = [email];
    const queryString = `SELECT * FROM users WHERE email = $1;`

    db.query(queryString, values)
      .then((data) => {
        const user = data.rows[0];

        if (!user) return res.status(400).json({ error: "email doesn't exist" });

        const { hashedPassword } = user;
        const correctPassword = bcrypt.compare(password, hashedPassword);

        if (!correctPassword) return res.status(400).json({ error: "email doesn't match with password" });

        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });

  router.post("/register", async (req, res) => {

    try {
      const { email, password, username, firstName, lastName } = req.body;
      const values1 = [email];
      const queryString1 = `SELECT * FROM users WHERE email = $1;`;
      const data1 = await db.query(queryString1, values1);

      const user = data1.rows[0];

      if (user) return res.status(400).json({ error: "email is already registered" });

      const hashedPassword = await bcrypt.hash(password, 12);

      const values2 = [email, hashedPassword, username, firstName, lastName];
      const queryString2 = `
        INSERT INTO users (email, password, username, first_name, last_name)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;
      const data2 = await db.query(queryString2, values2);

     res.json(data2);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  return router;
};
