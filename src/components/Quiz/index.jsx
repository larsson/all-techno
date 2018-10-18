import React from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import TextQuestion from "../Question/text";
import AudioQuestion from "../Question/audio";

import questions from "../../config/questions.js"

import './quiz.module.css'

class Quiz extends React.Component {
  constructor() {
    super()

    this.state = {
      currentQuestionIndex: 0,
      isFinished: false,
      questions
    }
  }

  onAnswerSelect = answerIndex => {
    console.log(answerIndex);
    this.nextQuestion()
  }

  nextQuestion() {
    let nextQuestionIndex = this.state.currentQuestionIndex+1

    if(nextQuestionIndex >= this.state.questions.length) {
      this.setState({
        ...this.state,
        isFinished: true,
        currentQuestionIndex: -1
      })
    } else {
      this.setState({
        ...this.state,
        currentQuestionIndex: nextQuestionIndex
      })
    }
  }

  renderCurrentQuestion = () => {
    let {
      isFinished,
      currentQuestionIndex,
      questions
    } = this.state


    if(isFinished) {
      return <Redirect to="/currentscore"/>
    }

    switch(questions[currentQuestionIndex].type) {
      case 'text': return <TextQuestion onAnswerSelect={this.onAnswerSelect} {...questions[currentQuestionIndex]} />;
      case 'audio': return <AudioQuestion onAnswerSelect={this.onAnswerSelect} {...questions[currentQuestionIndex]} />;
    }
  }

  render () {
    return (
      <div className="quiz-container">
        {this.renderCurrentQuestion()}
      </div>
    )
  }
}

export default Quiz;
