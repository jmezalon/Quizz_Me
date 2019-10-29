import React from "react";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import CreateQuiz from "./components/CreateQuiz";
import { QuizzList } from "./components/QuizzList";
import CurrentQuiz from "./components/CurrentQuiz";
import { Home } from "./components/Home";
import { Route, Switch } from "react-router-dom";
// , withRouter, Link
import "./App.css";

class App extends React.Component {
  state = {
    quizzes: [],
    questions: [],
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

  getAllQuizzes = () => {
    axios.get(`/quizzes`).then(res => {
      this.setState({
        quizzes: res.data.quizzes
      });
    });
  };

  getAllQuestions = () => {
    axios.get(`/questions`).then(res => {
      this.setState({
        questions: res.data.questions
      });
    });
  };

  componentDidMount() {
    this.getAllQuizzes();
    this.getAllQuestions();
  }

  render() {
    const { amount, title, topic, quizzes, questions } = this.state;

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
          <Route
            exact
            path="/quizlist"
            render={props => <QuizzList quizzes={quizzes} />}
          />
          <Route
            exact
            path="/quiz/:id"
            render={props => (
              <CurrentQuiz quizzes={quizzes} questions={questions} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
