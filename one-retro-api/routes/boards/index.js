const express = require("express");
const cors = require("cors");
const router = express.Router();
const Board = require("../../models/boards.model");
const Card = require("../../models/cards.model");
const { response } = require("../../app");
const CARD_TYPE_WENTWELL = 0;
const CARD_TYPE_TOIMPROVE = 1;
const CARD_TYPE_ACTIONITEMS = 2;

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

router.post("/create", async function (req, res, next) {
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

router.get("/detail/:boardId", async function (req, res, next) {
  console.log(req.params.boardId);
  const wentWell = await Card.find(
    { boardBelongTo: req.params.boardId, type: CARD_TYPE_WENTWELL },
    (error, response) => {
      if (error) {
        console.log(error);
        wentWell = [{}];
      }
    }
  );

  const toImprove = await Card.find(
    { boardBelongTo: req.params.boardId, type: CARD_TYPE_TOIMPROVE },
    (error, response) => {
      if (error) {
        console.log(error);
        toImprove = [{}];
      }
    }
  );

  const actionItems = await Card.find(
    { boardBelongTo: req.params.boardId, type: CARD_TYPE_ACTIONITEMS },
    (error, response) => {
      if (error) {
        console.log(error);
        actionItems = [{}];
      }
    }
  );

  console.log(wentWell);
  console.log(toImprove);
  console.log(actionItems);
  res.json({
    wentWellCards: wentWell,
    toImproveCards: toImprove,
    actionItemsCards: actionItems,
  });
});

router.post("/detail/newcard", async (req, res, next) => {
  const newCard = {
    type: req.body.type,
    content: req.body.content,
    boardBelongTo: req.body.boardBelongTo,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt,
  };
  const result = Card.create(newCard, (error, document) => {
    if (error) {
      console.log(err);
      res.json({ result: 400 });
      return;
    } else {
      res.json({ result: 201 });
    }
  });
});

module.exports = router;
