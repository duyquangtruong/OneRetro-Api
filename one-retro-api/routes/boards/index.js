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

router.post("/create", async function (req, res, next) {
  const newBoard = {
    name: req.body.name,
    description: req.body.description,
    createAt: req.body.createdAt,
    createdBy: req.body.createdBy,
  };

  const result = await Board.create(newBoard, (err, doc) => {
    if (err) {
      console.log(err);
      res.json({ result: 400 });
      return;
    } else {
      res.json({ result: 201 });
      return;
    }
  });
});
