import React from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import KarnovWait from './images/karnovWait.png';
import KarnovWaitHand from './images/karnovWaitHand.png';
import KarnovMeteor from './images/karnovMeteor.png';
import './wait.module.css'

class Wait extends React.Component {

  render () {
    return (
      <div className="wait-container">
        <h1 className="headline">Please wait</h1>
        <img className="waitKarnovMeteor" src={KarnovMeteor} />
        <img className="waitKarnovMeteor two" src={KarnovMeteor} />
        <img className="waitKarnovMeteor three" src={KarnovMeteor} />
        <div className="waiting">
          <img className="waitMan" src={KarnovWait} />
          <img className="waitManHand" src={KarnovWaitHand} />
        </div>
      </div>
    )
  }
}

export default Wait;
