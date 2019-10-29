const { db } = require("./connections.js");

const getAllQuestions = (req, res, next) => {
  db.any("SELECT * FROM questions")
    .then(questions => {
      res.status(200).json({
        status: "Success",
        questions: questions,
        message: "this is all the questions"
      });
    })
    .catch(err => next(err));
};

const getSingleQuestion = (req, res, next) => {
  let questionId = parseInt(req.params.id);
  db.one(`SELECT * FROM questions WHERE id=$1`, questionId)
    .then(question => {
      res.status(200).json({
        status: "success",
        question: question,
        message: "this is a single question"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const newQuestion = (req, res, next) => {
  req.body.difficulty_level = req.body.difficulty_level
    ? req.body.difficulty_level
    : null;
  req.body.quest_type = req.body.quest_type ? req.body.quest_type : null;
  req.body.decoy_amount = req.body.decoy_amount ? req.body.decoy_amount : null;

  db.none(
    "INSERT INTO questions (quiz_id, difficulty_level, quest_input, quest_type, decoy_amount) VALUES(${quiz_id}, ${difficulty_level}, ${quest_input}, ${quest_type}, ${decoy_amount})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you created a new question"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editQuestion = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  const questionId = parseInt(req.params.id);
  db.none(
    "UPDATE questions SET " + queryString + " WHERE id=" + questionId,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a question!"
      });
    })
    .catch(err => {
      console.log("err in edit question", err);
      next(err);
    });
};

const deleteQuestion = (req, res, next) => {
  let questionId = parseInt(req.params.id);
  db.result("DELETE FROM questions WHERE id=$1", questionId)
    .then(result => {
      res.status(200).json({
        status: "success",
        result: result,
        message: "you have deleted this question"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  newQuestion,
  editQuestion,
  deleteQuestion
};
