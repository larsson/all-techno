import React from 'react'
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
      answers,
      src,
      timeLeft
    } = this.props

    return (
      <div className="question-container">
        {src &&
          <figure>
            <video autoPlay="autoPlay" muted="muted" loop="loop" id="myVideo" playsinline>
              <source src={`./${src}`} type="video/mp4" />
            </video>
          </figure>
        }
        <div className="question-timer">
          <img alt="" className="spin" src={Timer} />
          <span>{timeLeft} sec</span>
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
