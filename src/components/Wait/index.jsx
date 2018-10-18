import React from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router'

import KarnovWait from './images/karnovWait.png';
import KarnovWaitHand from './images/karnovWaitHand.png';
import './wait.module.css'

class Wait extends React.Component {

  render () {
    return (
      <div className="wait-container">
        <h1 className="headline">Please wait</h1>
        <img className="waitMan" src={KarnovWait} />
        <img className="waitManHand" src={KarnovWaitHand} />
      </div>
    )
  }
}

export default Wait;
