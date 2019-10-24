import React from "react";
import { Navbar } from "./components/Navbar";
import CreateQuiz from "./components/CreateQuiz";
import { QuizzList } from "./components/QuizzList";
import { CurrentQuiz } from "./components/CurrentQuiz";
import { Home } from "./components/Home";
import { Route, Switch } from "react-router-dom";
// , withRouter, Link
import "./App.css";

class App extends React.Component {
  state = {
    quizzes: [],
    showList: false,
    showList2: false,
    amount: 5,
    title: "",
    topic: ""
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addOne = event => {
    event.preventDefault();
    this.setState({ amount: parseInt(this.state.amount) + 1 });
  };

  addFive = event => {
    event.preventDefault();
    this.setState({ amount: parseInt(this.state.amount) + 5 });
  };

  render() {
    const { amount, title, topic } = this.state;

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
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/myquiz"
            render={props => (
              <CreateQuiz
                {...props}
                amount={amount}
                title={title}
                topic={topic}
                handleChange={this.handleChange}
                addOne={this.addOne}
                addFive={this.addFive}
              />
            )}
          />
          <Route exact path="/quizlist" component={QuizzList} />
          <Route exact path="/quizlist" component={CurrentQuiz} />
        </Switch>
      </div>
    );
  }
}

export default App;
