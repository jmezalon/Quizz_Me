import React from "react";

export const NewQuizForm = ({
  topic,
  title,
  amount,
  addOne,
  addFive,
  handleChange,
  handleSubmit
}) => {

  

  return (
    <div className="newquiz-form">
      <form onSubmit={handleSubmit}>
        <p>start by selecting a topic for your quiz!</p>
        <input
          name="topic"
          onChange={handleChange}
          value={topic}
          placeholder="Your Topic"
        />
        <p>do you have a title for the quiz?</p>
        <input
          name="title"
          onChange={handleChange}
          value={title}
          placeholder="quiz title"
        />
        <p>now let us add some question...</p>
        <p>how many questions do you want to have for your quiz? {amount}</p>
        <div className="selecting-box" onChange={handleChange}>
          <input type="radio" name="amount" value={10} />
          <label htmlFor="10">10</label>

          <input type="radio" name="amount" value={25} />
          <label htmlFor="25">25</label>

          <input type="radio" name="amount" value={50} />
          <label htmlFor="50">50</label>
          <div className="selection-add">
            <button onClick={addOne}>add 1</button>
            <button onClick={addFive}>add 5</button>
            <div className="start-quiz-button">
              <input type="button" value="start" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
