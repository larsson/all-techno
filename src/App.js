import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'

import HighScore from "./components/HighScore";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import CurrentScore from "./components/CurrentScore";
import Wait from "./components/Wait";

import { Redirect } from 'react-router'

import './App.css';

const WS_URL = 'wss://ninetens.herokuapp.com/cable'

class App extends Component {
  state = {
    teamName: undefined,
    teams: [],
    round: 0,
    nextRound: 0
  }

  onReceived = data => {
    switch(data.message) {
      case 'teamLoggedIn':
        this.setState({
          ...this.state,
          teamName: data.name,
          teams: data.teams
        })
        break;
      case 'roundReady':
        if(this.state.round == 0) {
          this.setState({
            ...this.state,
            round: data.round,
            nextRound: data.round
          })
        } else {
          this.setState({
            ...this.state,
            nextRound: data.round
          })
        }
        break;
    }
  }

  onLogin = teamName => {
    this.refs.appChannel.perform('login', {name: teamName})
  }

  onNextRound = () => {
    this.setState({
      ...this.state,
      round: this.state.nextRound
    })
  }

  onStartGame = () => {
    this.refs.appChannel.perform('begin', {round: 1})
  }

  onAnswer = (isCorrect, time) => {
    this.refs.appChannel.perform('answer', {
      isCorrect,
      time
    })
  }

  render() {
    console.log("State:", this.state);
    return (
      <ActionCableProvider url={WS_URL}>
        <ActionCable
          ref='appChannel'
          channel={{channel: 'MessagesChannel'}}
          onReceived={this.onReceived} />

        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Loading />
              </Route>
              <Route exact path="/login">
                <Login onLogin={name => this.onLogin(name)} />
              </Route>
              <Route exact path="/start">
                <Quiz
                  onNextRound={this.onNextRound}
                  onStartGame={this.onStartGame}
                  {...this.state} />
              </Route>
              <Route exact path="/currentscore">
                <CurrentScore />
              </Route>
              <Route exact path="/wait">
                <div>
                  {this.state.round > 0 &&
                    <Redirect to={`/start`} />
                  }
                  <Wait teams={this.state.teams} />
                </div>
              </Route>
              <Route exact path="/highscore">
                <HighScore />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </ActionCableProvider>
    );
  }
}

export default App;
