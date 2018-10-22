import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import cn from 'classnames'

import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'

import HighScore from "./components/HighScore";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import CurrentScore from "./components/CurrentScore";
import Wait from "./components/Wait";

import { Redirect } from 'react-router'

import './App.css';

import questions from "./config/questions.js"

const WS_URL = 'wss://ninetens.herokuapp.com/cable'

class App extends Component {
  state = {
    teamName: undefined,
    teams: [],
    round: 0,
    nextRound: 0,
    classes: ['App']
  }

  onReceived = data => {
    console.log(data);
    switch(data.message) {
      case 'teamLoggedIn':
        this.setState({
          ...this.state,
          teamName: data.name,
          teams: data.teams
        })
        break;
      case 'roundReady':
        if(this.state.round === 0) {
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
      case 'answerRecorded':
        this.setState({
          ...this.state,
          scoreboard: data.scoreboard
        })
        break;
    }
  }

  onLogin = teamName => {
    this.refs.appChannel.perform('login', {name: teamName})
  }

  onNextRound = () => {
    if(this.state.nextRound > questions.length) {
      console.log('Done');
    }

    this.setState({
      ...this.state,
      round: this.state.nextRound
    })
  }

  onStartGame = () => {
    this.refs.appChannel.perform('begin', {round: 1})
  }

  // onAnswer = (isCorrect, time, round) => {
  //   this.refs.appChannel.perform('answer', {
  //     score: time,
  //     round: round,
  //     team: this.state.teamName
  //   })
  // }

  onTimeRunningOut = () => {
    this.setState({
      ...this.state,
      classes: [...this.state.classes, 'TimeRunningOut']
    })
  }

  clearTimeRunningOut = () => {
    this.setState({
      ...this.state,
      classes: ['App']
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

        <div className={cn(this.state.classes)}>
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
                  onTimeRunningOut={this.onTimeRunningOut}
                  clearTimeRunningOut={this.clearTimeRunningOut}
                  onNextRound={this.onNextRound}
                  onStartGame={this.onStartGame}
                  scoreboard={this.state.scoreboard}
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
