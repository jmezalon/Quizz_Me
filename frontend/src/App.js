import React from "react";
import { Navbar } from "./components/Navbar";
import CreateQuiz from "./components/CreateQuiz";
import { Home } from "./components/Home";
import { Route, Switch } from "react-router-dom";
// , withRouter, Link
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
        <Navbar
          handleSublist={this.handleSublist}
          handleSublistHide={this.handleSublistHide}
          showList={this.state.showList}
          showList2={this.state.showList2}
          handleReset={this.handleReset}
        />

        <Switch>
          <Route component={Home} />
          <Route
            exact
            path="/myquiz"
            render={props => <CreateQuiz {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
