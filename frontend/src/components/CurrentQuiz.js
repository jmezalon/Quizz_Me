import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// { topic, title, amount, quizzes }
class CurrentQuiz extends React.Component {
  state = {
    decoys: [],
    answer: ""
  };

  getDecoys = () => {};

  render() {
    let currentQuiz;
    if (this.props.quizzes) {
      currentQuiz = this.props.quizzes.filter(quiz => {
        return parseInt(quiz.id) === parseInt(this.props.match.params.id);
      });
    }

    let quizDisplay = currentQuiz.map((q, i) => {
      return (
        <div key={i} className="quiz-now">
          <p>you have selected: {q.title} </p>

          <p>
            this quiz, {q.topic} has {q.num_of_quest} questions
          </p>
        </div>
      );
    });

    let questions;
    if (this.props.questions) {
      questions = this.props.questions.filter(ques => {
        return parseInt(ques.quiz_id) === parseInt(this.props.match.params.id);
      });
    }

    let questionDisplay = questions.map(question => {
      return (
        <ul key={question.id}>
          <li>{question.quest_input}</li>
        </ul>
      );
    });

    return (
      <>
        {quizDisplay}
        <div> {questionDisplay}</div>
      </>
    );
  }
}

export default withRouter(CurrentQuiz);
