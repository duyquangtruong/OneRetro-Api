const express = require("express");
const cors = require("cors");
const router = express.Router();
const Board = require("../../models/boards.model");

/* GET home page. */
router.get("/", cors(), async function (req, res, next) {
  const Boards = await Board.find();
  res.json(Boards);
});

module.exports = router;
