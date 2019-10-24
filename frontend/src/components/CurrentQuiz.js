import React from "react";

export const CurrentQuiz = ({ topic, title, amount }) => {
  return (
    <div className="quiz-now">
      <p>you have selected this topic: </p>

      <p>
        this quiz, {title} has {amount} questions
      </p>
    </div>
  );
};
