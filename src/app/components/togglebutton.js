import React from 'react'

const ToggleButton = props => {

  const slot = 'toggle' +  props.index

  const onChange = e => {

    props.dispatch({
      [slot]: !props.state[slot]
    })
  }

  return <button
    className={`
      togglebutton ${ props.index }
      ${ props.state[slot] ? 'ON' : 'OFF' }
    `}
    onClick={ onChange }
  >
    { props.label }
  </button>
}

export default ToggleButton