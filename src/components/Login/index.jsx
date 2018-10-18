import React from 'react'
import PropTypes from 'prop-types'
import Sound from 'react-sound';

import InputLetter from './InputLetter'

import { Redirect } from 'react-router'

import mp3 from './RunningOut.mp3'
import './login.module.css'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      shouldGoNext: false
    }
  }

  handleNext = () => {
    this.setState({...this.state, shouldGoNext: true})
  }

  render () {
    if(this.state.shouldGoNext) {
      return <Redirect to="/start" />
    }

    return (
      <div className="login-container">
        <div className="login-head">
          <h1 className="login-headline">Team name</h1>
          <p className="login-subheadline">Enter your teams initials</p>
        </div>
        <div className="login-enterName">
          <InputLetter />
          <InputLetter />
          <InputLetter />
        </div>
        <div className="login-continue">
          <span onClick={this.handleNext}>next</span>
          <Sound
            url={mp3}
            playStatus={Sound.status.PLAYING}
            autoPlay={true}
          />
        </div>
      </div>
    )
  }
}

export default Login;
