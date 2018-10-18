import React from 'react'
import PropTypes from 'prop-types'
import Sound from 'react-sound';

import { Redirect } from 'react-router'

import mp3 from './RunningOut.mp3'
import './login.module.css'



class Login extends React.Component {
  handleNext = () => {

  }

  render () {
    return (
      <div className="login-container">
        <div className="login-head">
          <h1 className="login-headline">Team name</h1>
          <p className="login-subheadline">Enter your teams initials</p>
        </div>
        <div className="login-enterName">
          <select>
            <option defaultValue="">_</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
          <select>
            <option defaultValue="">_</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
          <select>
            <option defaultValue="">_</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
          </select>
        </div>
        <div className="login-continue">
          <span onClick={this.handleNext}>next</span>
          {(this.state && this.state.goNext) &&
            <Sound
              url={mp3}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => {
                window.location = "/start"
              }}
            />
          }
        </div>
      </div>
    )
  }
}

export default Login;
