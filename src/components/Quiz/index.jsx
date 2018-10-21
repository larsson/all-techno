import React from 'react'
import PropTypes from 'prop-types'

import { withRouter, Redirect } from 'react-router'

import TextQuestion from "../Question/text";
import AudioQuestion from "../Question/audio";

import questions from "../../config/questions.js"

import './quiz.module.css'

class Quiz extends React.Component {
  state = {
    currentQuestionIndex: 0,
    isFinished: false,
    questions,
    answers: []
  }

  isAnswerCorrect = (answerIndex, questionIndex=this.state.currentQuestionIndex) => {
    return answerIndex === questions[questionIndex].correct_answer
  }

  onAnswerSelect = answerIndex => {
    this.props.onAnswer(this.isAnswerCorrect(answerIndex), 1234)

    this.props.history.push("/currentscore")
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

export default withRouter(Quiz);
