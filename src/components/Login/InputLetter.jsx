import React from 'react'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

const InputLetter = ({onChange, value=""}) => {
  value = value.toLowerCase()

  return (
    <select value={value} onChange={e => onChange(e.target.value)} >
      {letters.indexOf(value) === -1 &&
        <option>_</option>
      }
      {
        letters.map((letter, i) => (
          <option
            key={i}
            value={letter}>
              {letter.toUpperCase()}
          </option>
        ))
      }
    </select>
  )
}

export default InputLetter
