import React from 'react'
import PropTypes from 'prop-types'

import { ActionCable } from 'react-actioncable-provider'

import Wait from "../Wait";
import CurrentScore from "../CurrentScore";

import TextQuestion from "../Question/text";
import AudioQuestion from "../Question/audio";

import questions from "../../config/questions.js"

import './quiz.module.css'

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

  onAnswerSelect = answerIndex => {
    console.log(answerIndex);
    // this.nextQuestion()

    this.refs.appChannel.perform('answer', {
      score: 123,
      teamName: this.props.teamName,
      round: this.props.round
    })



    this.stopTimer()

    this.setState({
      ...this.state,
      isFinished: true
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
    this.timer = setInterval(this.tick, 100)
  }

  stopTimer = () => {
    console.log('Answered in: '+this.state.time);

    clearInterval(this.timer)
    this.setState({
      ...this.state,
      score: this.state.time,
      time: 0
    })

    this.props.clearTimeRunningOut()
  }

  tick = () => {
    this.setState({
      ...this.state,
      time: this.state.time + 100
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
      isFinished,
      questions
    } = this.state

    switch(questions[this.props.round].type) {
      case 'text': return <TextQuestion onAnswerSelect={this.onAnswerSelect} {...questions[this.props.round]} />;
      case 'audio': return <AudioQuestion onAnswerSelect={this.onAnswerSelect} {...questions[this.props.round]} />;
    }
  }

  render () {
    if(this.state.isFinished) {
      return <CurrentScore onNext={this.nextQuestion} currentRound={this.props.round} nextRound={this.props.nextRound} />
    } else if (!this.props.round || this.props.round == 0) {
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
