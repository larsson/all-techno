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
      questions
    }
  }

  onAnswerSelect = answerIndex => {
    console.log(answerIndex);
    // this.nextQuestion()

    this.refs.appChannel.perform('answer', {
      isCorrect: true,
      score: 123,
      teamName: this.props.teamName
    })

    this.setState({
      ...this.state,
      isFinished: true
    })
  }

  nextQuestion = () => {
    this.props.onNextRound()

    this.setState({
      ...this.state,
      isFinished: false
    })

    // let nextQuestionIndex = this.state.currentQuestionIndex+1
    //
    // if(nextQuestionIndex >= this.state.questions.length) {
    //   this.setState({
    //     ...this.state,
    //     isFinished: true,
    //     currentQuestionIndex: -1
    //   })
    // } else {
    //   this.setState({
    //     ...this.state,
    //     currentQuestionIndex: nextQuestionIndex
    //   })
    // }
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
    console.log('Round: ' + this.props.round);
    if(this.state.isFinished) {
      return <CurrentScore onNext={this.nextQuestion} currentRound={this.props.round} nextRound={this.props.nextRound} />
    } else if (!this.props.round || this.props.round == 0) {
      return <Wait justStart={this.props.onStartGame} teams={this.props.teams} />
    } else {
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
