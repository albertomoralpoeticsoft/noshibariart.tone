import React from 'react';

export default props => {

  const slot = 'slider' +  props.index

  const onChange = e => {

    const value = parseFloat(e.target.value)
    props.dispatch({
      [slot]: value
    })
  }

  return (
    <div className={`
      slider ${ props.index }
    `}>
      <input
        type="range"
        min={ props.min }
        max={ props.max }
        step={ props.step }
        value={ props.state[slot] }
        onChange={ onChange }
      />
    </div>
  );
};