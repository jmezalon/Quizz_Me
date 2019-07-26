const { db } = require("./connections.js");

const getSingleAnswer = (req, res, next) => {
  let answerId = parseInt(req.params.id);
  db.one(`SELECT * FROM answers WHERE id=$1`, answerId)
    .then(answer => {
      res.status(200).json({
        status: "success",
        answer: answer,
        message: "this is a single answer"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const newAnswer = (req, res, next) => {
  db.none(
    "INSERT INTO answers (question_id, correct_ans) VALUES( ${question_id}, ${correct_ans})",
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

const editAnswer = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  const answerId = parseInt(req.params.id);
  db.none(
    "UPDATE answers SET " + queryString + " WHERE id=" + answerId,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a answer!"
      });
    })
    .catch(err => {
      console.log("err in edit answer", err);
      next(err);
    });
};

const deleteAnswer = (req, res, next) => {
  let answerId = parseInt(req.params.id);
  db.result("DELETE FROM answers WHERE id=$1", answerId)
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
  getSingleAnswer,
  newAnswer,
  editAnswer,
  deleteAnswer
};
