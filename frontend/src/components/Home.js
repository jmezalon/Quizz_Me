import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  // change this to when the user visit the link
  const [visited, setVisited] = useState(false);
  return (
    <div className="home">
      <div className="home-title">
        <h1>Welcome to Quizzme!!!</h1>
      </div>
      <div className="home-content">
        <h3>find all the possible questions about the bible</h3>
        <div id="content-list">
          <p>we have a wide variety of topics such as:</p>
          <ul className="topic-list">
            <li>The Creation</li>
            <li>Is Anger a sin</li>
            <li>Salvation</li>
            <ol>
              <li>Who is Christ?</li>
              <li>How Do I go to Heaven?</li>
            </ol>
            <li>What is Love?</li>
          </ul>
          <input
            type="button"
            value={!visited ? "Take your first Quiz" : "continue"}
            onClick={() => setVisited(true)}
          />
          <p>
            find more <Link to={"/quizzes"}>quizzes here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
