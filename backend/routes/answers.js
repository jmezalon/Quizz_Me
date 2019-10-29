const express = require("express");
const router = express.Router();
const {
  newAnswer,
  editAnswer,
  deleteAnswer,
  getSingleAnswer
} = require("../db/queries/answerQ.js");

router.patch("/edit/:id", editAnswer);

router.delete("/delete/:id", deleteAnswer);

router.get("/:id", getSingleAnswer);

router.post("/", newAnswer);

module.exports = router;
