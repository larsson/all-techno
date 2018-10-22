import React from 'react'
import Timer from './time.svg'

import './currentscore.module.css'

const ListEntry = ({num, name, score}) => {
  return (
    <li>
      <div>{num}</div>
      <div>{name}</div>
      <div>{score}</div>
    </li>
  )
}

class CurrentScore extends React.Component {
  renderScoreboard() {
    return this.props.scoreboard.map((entry, i) => (
      <ListEntry key={i} num={i+1} name={entry.name} score={entry.score} />
    ))
  }

  render() {
    return (
      <div className="currentscore-container">
        <div className="currentscore-wait">
          <img alt="" src={Timer} />
          <span>Waiting for other teams to finish...</span>
        </div>
        <h1>Scoreboard #{this.props.round}</h1>
        <div className="currentscore-scoreboard">
            <ul className="header">
              <li>RANK</li>
              <li>NAME</li>
              <li>SCORE</li>
            </ul>
            <ul className="list">
              {this.props.scoreboard && this.props.scoreboard.length > 0 &&
                this.renderScoreboard()
              }
            </ul>
        </div>
        {this.props.nextRound > this.props.currentRound &&
          <div onClick={() => this.props.onNext()} className="currentscore-continue">
            Next
          </div>
        }
      </div>
    )
  }
}

export default CurrentScore
