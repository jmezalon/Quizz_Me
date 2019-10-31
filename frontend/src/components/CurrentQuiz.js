import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// { topic, title, amount, quizzes }
class CurrentQuiz extends React.Component {
  state = {
    decoys: [],
    start: 0,
    next: false,
    instruction: "try to guess at least one before clicking next",
    correct: false,
    encouragement: false
  };

  getDecoysAndAnswer = id => {
    axios.get(`/decoys/answers/${id}`).then(res => {
      this.setState({
        decoys: res.data.decoys
      });
    });
  };

  isCorrect = ans => {
    if (this.state.decoys[0] && this.state.decoys[0].correct_ans === ans) {
      this.setState({ correct: true, encouragement: true });
    }
  };

  showPreviousQuestion = () => {
    this.setState({
      start: this.state.start - 1,
      encouragement: false
    });
  };

  showNextQuestion = () => {
    if (
      this.state.start <
      this.props.quizzes[this.props.match.params.id - 1].num_of_quest - 1
    ) {
      this.setState({
        start: this.state.start + 1,
        encouragement: false
      });
    }
  };

  showInstrunction = () => {
    this.setState({ next: true });
  };

  resetNext = () => {
    setTimeout(this.setState({ next: false }), 3000);
  };

  // componentDidMount() {
  //   this.getDecoysAndAnswer(1);
  // }

  render() {
    let theDecoys;
    if (this.state.decoys) {
      theDecoys = this.state.decoys.map(d => {
        return d.decoys;
      });
    }

    let correct_ans;
    if (this.state.decoys) {
      correct_ans = this.state.decoys.map(d => {
        return d.correct_ans;
      });
    }

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

    let decoyDisplay = theDecoys.map(dec => {
      return dec;
    });

    // console.log(this.state.decoys);

    let questionDisplay = questions.map(question => {
      if (question.quest_type) {
        return (
          <ul
            key={question.id}
            onClick={() => this.getDecoysAndAnswer(question.id)}
          >
            <li>{question.quest_input}</li>

            {this.state.decoys[0] &&
            question.id === this.state.decoys[0].question_id ? (
              <ol>
                <li>{decoyDisplay[0][0]}</li>
                <li
                  onClick={() =>
                    this.isCorrect(this.state.decoys[0].correct_ans)
                  }
                >
                  {correct_ans[0]}
                </li>
                <li>{decoyDisplay[0][1]}</li>
                <li>{decoyDisplay[0][2]}</li>
              </ol>
            ) : (
              ""
            )}
            {this.state.encouragement ? <p>good job</p> : ""}
          </ul>
        );
      } else {
        return null;
      }
    });

    return (
      <>
        {quizDisplay}
        <div onClick={this.resetNext}> {questionDisplay[this.state.start]}</div>
        <h6 onClick={this.showNextQuestion}>Next</h6>
        {this.state.start > 0 ? (
          <h6 onClick={this.showPreviousQuestion}>Previous</h6>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(CurrentQuiz);

// <h6
//   onClick={
//     this.state.correct ? this.showNextQuestion : this.showInstrunction
//   }
// >
