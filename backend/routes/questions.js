const express = require("express");
const router = express.Router();
const {
  newQuestion,
  editQuestion,
  deleteQuestion,
  getSingleQuestion,
  getAllQuestions
} = require("../db/queries/questionQ.js");

router.get("/", getAllQuestions);

router.patch("/edit/:id", editQuestion);

router.delete("/delete/:id", deleteQuestion);

router.get("/:id", getSingleQuestion);

router.post("/", newQuestion);

module.exports = router;
