import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HighScore from "./components/HighScore";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import CurrentScore from "./components/CurrentScore";
import Wait from "./components/Wait";

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Loading />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/start">
              <Quiz />
            </Route>
            <Route exact path="/currentscore">
              <CurrentScore />
            </Route>
            <Route exact path="/wait">
              <Wait />
            </Route>            
            <Route exact path="/highscore">
              <HighScore />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
