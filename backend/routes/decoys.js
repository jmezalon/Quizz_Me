const express = require("express");
const router = express.Router();
const {
  newDecoy,
  deleteDecoy,
  getAllDecoyForOneQuestion
} = require("../db/queries/decoyQ.js");

router.delete("/delete/:id", deleteDecoy);

router.get("/question/:id", getAllDecoyForOneQuestion);

router.post("/", newDecoy);

module.exports = router;
