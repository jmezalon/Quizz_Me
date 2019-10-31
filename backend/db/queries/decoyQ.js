const { db } = require("./connections.js");

const getAllDecoyAndAnswerForOneQuestion = (req, res, next) => {
  let questionId = parseInt(req.params.id);
  db.any(
    `SELECT decoys, d.correct_ans, d.question_id
FROM answers AS d
JOIN questions AS q ON q.id = d.question_id
FULL JOIN
(SELECT ARRAY_AGG(DISTINCT decoys.decoy_ans) AS decoys, question_id
FROM decoys
GROUP BY decoys.question_id) AS decoys
ON q.id = decoys.question_id

 WHERE q.id = $1`,
    [questionId]
  )
    .then(decoys => {
      res.status(200).json({
        status: "Success",
        decoys: decoys,
        message: "this is all the decoys"
      });
    })
    .catch(err => next(err));
};

const getAllDecoyForOneQuestion = (req, res, next) => {
  let questionId = parseInt(req.params.id);
  db.any("SELECT decoys.decoy_ans FROM decoys WHERE question_id=$1", [
    questionId
  ])
    .then(decoys => {
      res.status(200).json({
        status: "Success",
        decoys: decoys,
        message: "this is all the decoys"
      });
    })
    .catch(err => next(err));
};

const newDecoy = (req, res, next) => {
  db.none(
    "INSERT INTO decoys (question_id, decoy_ans) VALUES( ${question_id}, ${decoy_ans})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you created a new answer"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteDecoy = (req, res, next) => {
  let answerId = parseInt(req.params.id);
  db.result("DELETE FROM decoys WHERE id=$1", answerId)
    .then(result => {
      res.status(200).json({
        status: "success",
        result: result,
        message: "you have deleted this answer"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllDecoyForOneQuestion,
  newDecoy,
  deleteDecoy,
  getAllDecoyAndAnswerForOneQuestion
};
