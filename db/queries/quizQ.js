const { db } = require("./connections.js");

const getAllQuiz = (req, res, next) => {
  db.any("SELECT * FROM quizzes")
    .then(quizzes => {
      res.status(200).json({
        status: "Success",
        quizzes: quizzes,
        message: "this is all the quizzes"
      });
    })
    .catch(err => next(err));
};

const getSingleQuiz = (req, res, next) => {
  let quizId = parseInt(req.params.id);
  db.one(`SELECT * FROM quizzes WHERE id=$1`, quizId)
    .then(quiz => {
      res.status(200).json({
        status: "success",
        quiz: quiz,
        message: "this is a single quiz"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const newQuiz = (req, res, next) => {
  req.body.title = req.body.title ? req.body.title : null;

  db.none(
    "INSERT INTO quizzes (title, topic_id, num_of_quest) VALUES(${title}, ${topic_id}, ${num_of_quest})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you created a new quiz"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editQuiz = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  const quizId = parseInt(req.params.id);
  db.none("UPDATE quizzes SET " + queryString + " WHERE id=" + quizId, req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a quiz!"
      });
    })
    .catch(err => {
      console.log("err in edit quiz", err);
      next(err);
    });
};

const deleteQuiz = (req, res, next) => {
  let quizId = parseInt(req.params.id);
  db.result("DELETE FROM quizzes WHERE id=$1", quizId)
    .then(result => {
      res.status(200).json({
        status: "success",
        result: result,
        message: "you have deleted this quiz"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllQuiz,
  getSingleQuiz,
  newQuiz,
  editQuiz,
  deleteQuiz
};
