import React from 'react'

import { ActionCable } from 'react-actioncable-provider'

import Wait from "../Wait";
import CurrentScore from "../CurrentScore";

import TextQuestion from "../Question/text";
import AudioQuestion from "../Question/audio";

import questions from "../../config/questions.js"

import './quiz.module.css'

const tickInterval = 25

class Quiz extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuestionIndex: props.round || undefined,
      isFinished: false,
      questions,
      time: 0,
      score: 0
    }
  }

  calculateScore = (time, answerIndex) => {
    if(questions[this.props.round].correct_answer !== answerIndex) {
      return 0
    }

    return 15000-time;
  }

  onAnswerSelect = answerIndex => {
    console.log('answer', answerIndex);
    // this.nextQuestion()

    this.refs.appChannel.perform('answer', {
      score: this.calculateScore(this.state.time),
      round: this.props.round,
      name: this.props.teamName
    })

    this.stopTimer()

    this.setState({
      ...this.state,
      isFinished: true,
      time: 0,
      score: 0
    })

    this.refs.appChannel.perform('begin', {round: this.props.round+1})
  }

  nextQuestion = () => {
    this.props.onNextRound()

    this.setState({
      ...this.state,
      isFinished: false
    })
  }

  startTimer = () => {
    this.timer = setInterval(this.tick, tickInterval)
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.setState({
      ...this.state,
      time: 0
    })

    this.props.clearTimeRunningOut()
  }

  tick = () => {
    this.setState({
      ...this.state,
      time: this.state.time + tickInterval
    })

    if(this.state.time > 10000) {
      this.props.onTimeRunningOut()
    }

    if(this.state.time > 15000) {
      this.stopTimer()
    }
  }

  renderCurrentQuestion = () => {
    let {
      questions
    } = this.state

    const timeLeft = parseInt(Math.round(15000 - this.state.time)/1000, 10)

    switch(questions[this.props.round].type) {
      default:
      case 'text': return <TextQuestion timeLeft={timeLeft} onAnswerSelect={this.onAnswerSelect} {...questions[this.props.round]} />;
      case 'audio': return <AudioQuestion timeLeft={timeLeft} onAnswerSelect={this.onAnswerSelect} {...questions[this.props.round]} />;
    }
  }

  render () {
    if(this.state.isFinished) {
      return <CurrentScore
        onNext={this.nextQuestion}
        currentRound={this.props.round}
        nextRound={this.props.nextRound}
        scoreboard={this.props.scoreboard} />
    } else if (!this.props.round || this.props.round === 0) {
      return <Wait justStart={this.props.onStartGame} teams={this.props.teams} />
    } else {
      if(this.state.time === 0) {
        this.startTimer()
      }

      return (
        <div className="quiz-container">
          <ActionCable
            ref='appChannel'
            channel={{channel: 'MessagesChannel'}}
            />
          {this.renderCurrentQuestion()}
        </div>
      )
    }
  }
}

export default Quiz;
