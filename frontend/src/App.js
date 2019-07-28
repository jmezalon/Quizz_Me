import React from "react";
import { Navbar } from "./components/Navbar";
import { Route } from "react-router-dom";
// , Switch, withRouter, Link
import "./App.css";

class App extends React.Component {
  state = {
    quizzes: [],
    showList: false,
    showList2: false
  };
  handleSublist = () => {
    this.setState({ showList: true, showList2: false });
  };
  handleSublistHide = () => {
    this.setState({ showList: false, showList2: true });
  };

  handleReset = () => {
    this.setState({ showList: false, showList2: false });
  };
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => (
            <Navbar
              {...props}
              handleSublist={this.handleSublist}
              handleSublistHide={this.handleSublistHide}
              showList={this.state.showList}
              showList2={this.state.showList2}
              handleReset={this.handleReset}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
