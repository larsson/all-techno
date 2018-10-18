import React from 'react'
import PropTypes from 'prop-types'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

const InputLetter = (props) => {
  return (
    <select>
      <option defaultValue="">_</option>
      {
        letters.map(letter => <option value={letter}>{letter.toUpperCase()}</option>)
      }
    </select>
  )
}

export default InputLetter
