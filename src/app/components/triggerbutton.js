import React from 'react';

export default props => {

  const slot = 'trigger' +  props.index

  const down = e => {

    props.dispatch({
      [slot]: true
    })
  } 

  const up = e => {

    props.dispatch({
      [slot]: false
    })
  }

  return <button
    className={`
      triggerbutton ${ props.index }
      ${ props.state[slot] ? 'ON' : 'OFF' }
    `}
    onMouseDown={ down }
    onMouseUp={ up }
    onTouchStart={ down }
    onTouchEnd={ up }
  >
    { props.label }
  </button>
}