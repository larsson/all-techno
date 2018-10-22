import React from 'react'
import PropTypes from 'prop-types'
import Timer from './time.svg'

class QuestionSkeleton extends React.Component {
  state = {
    selectedAnswerIndex: -1
  }

  onAnswer = i => {
    this.setState({
      ...this.state,
      selectedAnswerIndex: i
    })
    this.props.onAnswerSelect(i)
  }
  
  render () {
    const {
      text,
      answers
    } = this.props

    return (
      <div className="question-container">
        <div className="question-timer">
          <img className="spin" src={Timer} />
          <span>15 SEC</span>
        </div>
        <div className="question-text">{text}</div>
        {this.props.children}

        <div className="answer-container">
          {answers.map((answer, i) => (
            <div
              key={i}
              className={"answer "+(i === this.state.selectedAnswerIndex ? "selected" : "")}
              onClick={() => this.onAnswer(i)}>
               <span className="answer-container-number">{i+1}</span>{answer}
             </div>
          ))}
        </div>

      </div>
    )
  }
}

export default QuestionSkeleton;
