import React from 'react'
import Sound from 'react-sound';

import QuestionSkeleton from './skeleton'

class AudioQuestion extends React.Component {

  render () {
    return (
      <React.Fragment>
        <QuestionSkeleton {...this.props} />
        <Sound
          url="/tmnt.mp3"
          playStatus={Sound.status.PLAYING}
          />
      </React.Fragment>
    )
  }
}

export default AudioQuestion;
