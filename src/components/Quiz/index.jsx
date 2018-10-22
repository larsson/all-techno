import React from 'react'
import cn from 'classnames'
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

  componentWillUnmount() {
    this.stopTimer()
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


    this.props.clearTimeRunningOut()
  }

  tick = () => {
    let nextTime = this.state.time + tickInterval
    this.setState({
      ...this.state,
      time: (nextTime > 15000 ? 15000 : nextTime)
    })

    if(this.state.time >= 10000) {
      this.props.onTimeRunningOut()
    }

    if(this.state.time >= 15000) {
      this.stopTimer()
    }
  }

  renderCurrentQuestion = () => {
    if(this.state.isFinished) {
      return <CurrentScore
        onNext={this.nextQuestion}
        currentRound={this.props.round}
        nextRound={this.props.nextRound}
        scoreboard={this.props.scoreboard} />
    }

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
    if (!this.props.round || this.props.round === 0) {
      return <Wait justStart={this.props.onStartGame} teams={this.props.teams} />
    } else {
      if(this.state.time === 0) {
        this.startTimer()
      }

      console.log(this.props.round);

      return (
        <div className="quiz-container">
          <ActionCable
            ref='appChannel'
            channel={{channel: 'MessagesChannel'}}
            />
          {questions[this.props.round].src &&
            <div className={`video-container ${this.state.isFinished ? "isFinished" : ""}`}>
              <video autoPlay="autoPlay" loop="loop" id="myVideo" playsInline>
                <source src={`./${questions[this.props.round].src}`} type="video/mp4" />
              </video>
            </div>
          }


          {this.renderCurrentQuestion()}
        </div>
      )
    }
  }
}

export default Quiz;
