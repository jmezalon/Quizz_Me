import React from "react";
import { NewQuizForm } from "./NewQuizForm";
// import { Link } from "react-router-dom";
// , withRouter,

class CreateQuiz extends React.Component {
  render() {
    const { amount, title, topic, handleChange, addOne, addFive } = this.props;
    return (
      <div className="new-quiz">
        <h2>Create your own quiz</h2>

        <NewQuizForm
          amount={amount}
          title={title}
          topic={topic}
          handleChange={handleChange}
          addOne={addOne}
          addFive={addFive}
        />
      </div>
    );
  }
}

export default CreateQuiz;
