import React from 'react'
import PropTypes from 'prop-types'

import KarnovWait from './images/karnovWait.png';
import KarnovWaitHand from './images/karnovWaitHand.png';
import KarnovMeteor from './images/karnovMeteor.png';
import './wait.module.css'

class Wait extends React.Component {
  render () {
    let {
      teams
    } = this.props

    return (
      <div className="wait-container">
        <h1 className="headline">Please wait</h1>
        <img className="waitKarnovMeteor" src={KarnovMeteor} />
        <img className="waitKarnovMeteor two" src={KarnovMeteor} />
        <img className="waitKarnovMeteor three" src={KarnovMeteor} />
        <div className="waiting">
          <img className="waitMan" onClick={() => this.props.justStart()} src={KarnovWait}  />
          <img className="waitManHand" src={KarnovWaitHand} />
        </div>
        <div className="marquee">
          <span className="streamer"><span>TEAMS ARE:</span>{teams.map((teamName,i) => <span>{teamName}</span>)}</span>
        </div>
      </div>
    )
  }
}

export default Wait;
