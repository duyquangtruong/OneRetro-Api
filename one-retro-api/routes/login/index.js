const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("../../models/users.model");
const dotenv = require("dotenv");
dotenv.config();
const SecretKey = process.env.SECRET_KEY;

/* GET home page. */
router.get("/", async function (req, res, next) {
  let token = jwt.sign(JSON.stringify({ name: "duyquangtruong" }), SecretKey);
  let result = jwt.verify(token, SecretKey);
  console.log(token);
  res.send(result);
});

module.exports = router;
