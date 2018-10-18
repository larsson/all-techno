import React from 'react'
import PropTypes from 'prop-types'

import QuestionSkeleton from './skeleton'

import './question.module.css'

class TextQuestion extends React.Component {
  onSelect = answerId => {
    console.log('Selected '+answerId);
  }

  render () {
    return (
      <QuestionSkeleton {...this.props} />
    )
  }
}

export default TextQuestion;
