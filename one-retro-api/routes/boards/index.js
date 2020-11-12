const express = require("express");
const cors = require("cors");
const router = express.Router();
const Board = require("../../models/boards.model");
const { response } = require("../../app");

/* GET home page. */
router.post("/", async function (req, res, next) {
  const Boards = await Board.find(
    { createdBy: req.body.createdBy },
    (error, response) => {
      if (error) {
        res.json([{}]);
        return;
      }
    }
  );
  res.json(Boards);
});

module.exports = router;

router.post("/create", async function (req, res, next) {
  console.log(req.body);
  const newBoard = {
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
  };

  await Board.create(newBoard, (err, doc) => {
    if (err) {
      console.log(err);
      res.json({ result: 400 });
      return;
    } else {
      Board.find().then((response) =>
        res.json({ result: 201, boardList: response })
      );
    }
  });
});
