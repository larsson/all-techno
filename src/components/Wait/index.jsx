import React from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import KarnovWait from './images/karnovWait.png';
import KarnovWaitHand from './images/karnovWaitHand.png';
import './wait.module.css'

class Wait extends React.Component {
  render () {
    let {
      teams
    } = this.props

    return (
      <div className="wait-container">
        <h1 className="headline">Please wait</h1>
        <img className="waitMan" src={KarnovWait} />
        <img className="waitManHand" src={KarnovWaitHand} />
        <div className="marquee">
          <span className="streamer"><span>TEAMS ARE:</span>{teams.map((teamName,i) => <span>{teamName}</span>)}</span>
        </div>
      </div>
    )
  }
}

export default Wait;
