const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("../../models/users.model");
const dotenv = require("dotenv");
const { request } = require("express");
dotenv.config();
const SecretKey = process.env.SECRET_KEY;

router.post("/", async function (req, res, next) {
  let token = jwt.sign(
    JSON.stringify({
      username: req.body.username,
      password: req.body.password,
    }),
    SecretKey
  );

  console.log(req.body);
  const user = await User.findOne({ username: req.body.username });

  if (user == null) {
    res.json({ error: 400 });
    return;
  }

  if (user.password !== token) {
    res.json({ error: 401 });
    return;
  }

  let isRemember = req.body.isRemember;

  res.json(user);
});

module.exports = router;
