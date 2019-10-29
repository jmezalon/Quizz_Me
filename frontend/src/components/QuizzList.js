import React from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

export const QuizzList = ({ topic, title, amount, quizzes }) => {
  // console.log(quizzes);
  let allQuizzes = quizzes.map(quiz => {
    return (
      <ul key={quiz.id}>
        <Link to={`/quiz/${quiz.id}`}>
          <li>{quiz.title}</li>
        </Link>
        <p>{quiz.num_of_quest} questions</p>
      </ul>
    );
  });
  return (
    <div className="quiz-list">
      <p>we have many different quizzes that you can choose from </p>
      {allQuizzes}
    </div>
  );
};
