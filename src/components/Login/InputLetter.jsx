import React from 'react'
import PropTypes from 'prop-types'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

const InputLetter = ({onChange}) => {
  return (
    <select onChange={e => onChange(e.target.value)} >
      <option defaultValue="">_</option>
      {
        letters.map((letter, i) => <option key={i} value={letter}>{letter.toUpperCase()}</option>)
      }
    </select>
  )
}

export default InputLetter
