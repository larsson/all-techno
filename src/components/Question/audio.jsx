import React from 'react'

import QuestionSkeleton from './skeleton'

class AudioQuestion extends React.Component {

  render () {
    return (
      <React.Fragment>
        <QuestionSkeleton {...this.props} />
      </React.Fragment>
    )
  }
}

export default AudioQuestion;
