import React from "react";
import Sound from 'react-sound';
import themeSong from './KarnovTheme.mp3'
import Logo from "./images/karnovLogo.png"
import karnovMan from "./images/karnovMan.png"
import karnovDino from "./images/karnovDino.png"
import karnovMeteor from "./images/karnovMeteor.png"
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
    document.body.addEventListener('keypress', this.insertCoin);
    document.body.addEventListener('touchend', this.insertCoin);
  }

  insertCoin = () => {
    this.setState({...this.state, coinInserted: true})
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
              window.location = "/login"
            }} />
        }
        <h1>Tech Presents</h1>
        <img className="logo" src={Logo} alt="logo" />
        <span className="loading-text">CONTINUE?</span>
        <span className="loading-press-any">PRESS ANY KEY</span>
        <img className="karnov-meteor" src={karnovMeteor} alt="karnovmeteor" />
        <img className="karnov-man" src={karnovMan} alt="karnovman" />
        <img className="karnov-dino" src={karnovDino} alt="karnovdino" />
        <img className="karnov-meteor two" src={karnovMeteor} alt="karnovmeteor" />
        <img className="karnov-meteor three" src={karnovMeteor} alt="karnovmeteor" />
        {(this.state && this.state.coinInserted == false) &&
        <Sound
          url={themeSong}
          playStatus={Sound.status.PLAYING}
          autoPlay={true}
          />
        }
      </div>
    );
  }
}

export default Loading;
