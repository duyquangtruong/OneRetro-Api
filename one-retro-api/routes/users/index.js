const express = require("express");
const router = express.Router();
const User = require("../../models/users.model");

router.post("/", async function (req, res, next) {
  const userId = req.body._id;
  const resUserInfo = await User.findOne({ _id: userId }, (error, response) => {
    if (error) {
      res.json({ result: 400 });
      return;
    }
  });
  res.json({ result: 200, userInfo: resUserInfo });
});

router.post("/update", async function (req, res, next) {
  const newValue = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findOneAndUpdate(
    { username: req.body.username },
    newValue
  );
  if (user) {
    res.json({ result: 200 });
  } else {
    res.json({ result: 400 });
  }
});

module.exports = router;
