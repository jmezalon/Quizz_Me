const express = require("express");
const router = express.Router();
const {
  newQuiz,
  editQuiz,
  deleteQuiz,
  getSingleQuiz,
  getAllQuiz
} = require("../db/queries/quizQ.js");

router.get("/", getAllQuiz);

router.patch("/edit/:id", editQuiz);

router.delete("/delete/:id", deleteQuiz);

router.get("/:id", getSingleQuiz);

router.post("/", newQuiz);

module.exports = router;
