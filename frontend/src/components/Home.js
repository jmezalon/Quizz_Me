import React from "react";

export const Home = () => {
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
        </div>
      </div>
    </div>
  );
};
