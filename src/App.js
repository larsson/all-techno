import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import cn from 'classnames'

import Sound from 'react-sound';
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
  constructor() {
    super()

    document.cookie = ""

    this.state = {
      teamName: document.cookie || undefined,
      teams: [],
      round: 0,
      nextRound: 0,
      classes: ['App']
    }

    console.log('Logged in with: '+this.state.teamName);
  }

  onReceived = data => {
    console.log('RECEIVED: ', data);
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
      default:
        console.log('Unknown action: '+data.message);
        break;
    }
  }

  onLogin = teamName => {
    this.refs.appChannel.perform('login', {name: teamName})
    document.cookie = JSON.stringify({name: teamName})
  }

  onNextRound = () => {
    this.setState({
      ...this.state,
      round: this.state.nextRound
    })
  }

  onStartGame = () => {
    // this.refs.appChannel.perform('begin', {round: 1})
  }

  onTimeRunningOut = () => {
    if(this.state.classes.indexOf('TimeRunningOut') === -1) {
      this.setState({
        ...this.state,
        classes: [...this.state.classes, 'TimeRunningOut']
      })
    }
  }

  clearTimeRunningOut = () => {
    this.setState({
      ...this.state,
      classes: ['App']
    })
  }

  onSoundFinish = () => {
    this.setPlaySound()
  }

  setPlaySound = url => {
    this.setState({
      ...this.state,
      playSound: url
    })
  }

  stopSound = () => {
    this.setPlaySound(undefined)
  }

  render() {
    return (
      <ActionCableProvider url={WS_URL}>
        <ActionCable
          ref='appChannel'
          channel={{channel: 'MessagesChannel'}}
          onReceived={this.onReceived} />


        <div className={cn(this.state.classes)}>
          {this.state.playSound &&
            <Sound
              url={this.state.playSound}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => this.onSoundFinish()}
               />
          }


          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Loading />
              </Route>
              <Route exact path="/login">
                <Login
                  name={this.state.teamName}
                  setPlaySound={this.setPlaySound}
                  stopSound={this.stopSound}
                  onLogin={name => this.onLogin(name)} />
              </Route>
              <Route exact path="/start">
                <Quiz
                  teamName={this.state.teamName}
                  onTimeRunningOut={this.onTimeRunningOut}
                  clearTimeRunningOut={this.clearTimeRunningOut}
                  onNextRound={this.onNextRound}
                  onStartGame={this.onStartGame}
                  scoreboard={this.state.scoreboard}
                  {...this.state} />
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
                <HighScore scoreboard={this.state.scoreboard} />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </ActionCableProvider>
    );
  }
}

export default App;
