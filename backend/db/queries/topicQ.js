const { db } = require("./connections.js");

const getAllTopics = (req, res, next) => {
  db.any("SELECT * FROM topics")
    .then(topics => {
      res.status(200).json({
        status: "Success",
        topics: topics,
        message: "this is all the topics"
      });
    })
    .catch(err => next(err));
};

const getSingleTopic = (req, res, next) => {
  let topicId = parseInt(req.params.id);
  db.one(`SELECT * FROM topics WHERE id=$1`, topicId)
    .then(topic => {
      res.status(200).json({
        status: "success",
        topic: topic,
        message: "this is a single topic"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const newTopic = (req, res, next) => {
  req.body.title = req.body.title ? req.body.title : null;

  db.none("INSERT INTO topics (name) VALUES(${name})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you created a new topic"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const editTopic = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  const topicId = parseInt(req.params.id);
  db.none("UPDATE topics SET " + queryString + " WHERE id=" + topicId, req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a topic!"
      });
    })
    .catch(err => {
      console.log("err in edit topic", err);
      next(err);
    });
};

const deleteTopic = (req, res, next) => {
  let topicId = parseInt(req.params.id);
  db.result("DELETE FROM topics WHERE id=$1", topicId)
    .then(result => {
      res.status(200).json({
        status: "success",
        result: result,
        message: "you have deleted this topic"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllTopics,
  getSingleTopic,
  newTopic,
  editTopic,
  deleteTopic
};
