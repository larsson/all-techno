import React from 'react'
import Sound from 'react-sound';

import QuestionSkeleton from './skeleton'

class AudioQuestion extends React.Component {

  render () {
    let {
      text,
      answers
    } = this.props

    return (
      <div>
        <QuestionSkeleton {...this.props} />
        <Sound
          url="/tmnt.mp3"
          playStatus={Sound.status.PLAYING}
          />
      </div>
    )
  }
}

export default AudioQuestion;
