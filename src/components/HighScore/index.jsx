import React from 'react'
import PropTypes from 'prop-types'

import './scores.css'

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

const HighScore = ({users=[
    {name: "NNA", score: 100000},
    {name: "AUS", score: 412421},
    {name: "KJM", score: 394432},
    {name: "PGA", score: 40310},
    {name: "HUH", score: 30034},
    {name: "LOL", score: 200},
    {name: "PIO", score: 10},
    {name: "PER", score: 4}
  ]}) => {
  console.log(users);
  return (
    <div className="scores-container">
      <h1>These are the highscores</h1>
      <div class="scoreboard">
        <ul className="header">
            <li>RANK</li>
            <li>NAME</li>
            <li>SCORE</li>
        </ul>
        <ul className="list">
          {users.map((user,i) => (
            <li>
              <div>{ordinal_suffix_of(i+1)}</div>
              <div>{user.name}</div>
              <div>{user.score}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HighScore
