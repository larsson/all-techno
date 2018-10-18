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
    {name: "Nichlas", score: 100000},
    {name: "Andrew", score: 412421},
    {name: "Jens", score: 394432},
    {name: "Lucas", score: 40310},
    {name: "Adomas", score: 30034},
    {name: "Stephanié", score: 200},
    {name: "Jesper", score: 10},
    {name: "Peter", score: 4}
  ]}) => {
  console.log(users);
  return (
    <div className="scores-container">
      <h1>These are the high scorers</h1>
      <table>
        <thead>
          <tr>
            <td>RANK</td>
            <td>NAME</td>
            <td>SCORE</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user,i) => (
            <tr>
              <td>{ordinal_suffix_of(i+1)}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HighScore
