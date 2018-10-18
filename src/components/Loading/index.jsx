import React from "react";
import Sound from 'react-sound';

import "./loading.module.css";

class Loading extends React.Component {
  constructor() {
    super()

    this.state = {
      coinInserted: false
    }
  }

  componentDidMount() {
    let self = this
    document.body.addEventListener('keypress', (e) => {
      console.log('insert coin!');

      self.setState({...self.state, coinInserted: true})
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('keypress')
  }

  render () {
    return (
      <div className="loading-container">
        {(this.state && this.state.coinInserted) &&
          <Sound
            url="/coin.mp3"
            playStatus={Sound.status.PLAYING}
            onFinishedPlaying={() => {
              window.location = "/start"
            }} />
        }

        <span className="loading-text">CONTINUE?</span>
        <span className="loading-press-any">PRESS ANY KEY</span>
      </div>
    );
  }
}

export default Loading;
