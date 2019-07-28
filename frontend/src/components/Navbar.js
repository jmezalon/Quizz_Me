import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({
  handleSublist,
  showList,
  showList2,
  handleReset,
  handleSublistHide
}) => {
  return (
    <div className="navbar">
      <Link to="/">
        <p>Home</p>
      </Link>

      <div
        onMouseOver={handleSublist}
        onMouseLeave={handleReset}
        className="list-title"
      >
        <Link to="/myquiz">
          <p>Create quiz</p>
        </Link>
        <div className={!showList ? "sublist-title-hide" : "show"}>
          <section onMouseEnter={handleSublist} onMouseLeave={handleReset}>
            <Link to="/editquiz">
              <p>
                <img
                  id="edit-img"
                  alt=""
                  src="https://www.shareicon.net/data/512x512/2016/08/06/807541_edit_512x512.png"
                />
                quiz
              </p>
            </Link>
            <Link to="/deletequiz">
              <p>
                <img
                  id="delete-img"
                  alt=""
                  src="https://cdn1.iconfinder.com/data/icons/device-apps-settings/2048/Recycle_bin-512.png"
                />
                quiz
              </p>
            </Link>
          </section>
        </div>
      </div>
      <div
        onMouseOver={handleSublistHide}
        onMouseLeave={handleReset}
        className="list-title"
      >
        <Link to="/quizlist">
          <p>Categories</p>
        </Link>
        <div className={!showList2 ? "sublist-title-hide" : "show"}>
          <section onMouseOver={handleSublistHide} onMouseLeave={handleReset}>
            <p>Math</p>
            <p>Science</p>
            <p>English</p>
          </section>
        </div>
      </div>
      <p>Create an account</p>
    </div>
  );
};
