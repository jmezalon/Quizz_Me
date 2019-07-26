const express = require("express");
const router = express.Router();
const {
  newTopic,
  editTopic,
  deleteTopic,
  getSingleTopic,
  getAllTopics
} = require("../db/queries/topicQ.js");

router.get("/", getAllTopics);

router.patch("/edit/:id", editTopic);

router.delete("/delete/:id", deleteTopic);

router.get("/:id", getSingleTopic);

router.post("/", newTopic);

module.exports = router;
