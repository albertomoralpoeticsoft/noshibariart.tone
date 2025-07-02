import immutableUpdate from 'immutable-update'
import React, {
  useReducer
} from 'react'
import Slider from './slider';
import ToggleButton from './togglebutton';
import TriggerButton from './triggerbutton';
import XYPad from './xypad';

export default props => {

  const [ state, dispatch] = useReducer(
    (state, action) => {

      const newState = immutableUpdate(
        state,
        action
      )

      return newState
    },
    {
      sliderA: 0,
      sliderB: 0,
      toggleA: false,
      toggleB: false,
      triggerA: false,
      triggerB: false,
      xypadX: 50,
      xypadY: 50,
    }
  )

  return <div id="APP">
    <div className="sliders">
      <Slider
        index="A"
        label="Slider A"
        min={0}
        max={1}
        step={0.01}
        state={ state }
        dispatch={ dispatch }
      />
      <Slider
        index="B"
        label="Slider B"
        min={0}
        max={1}
        step={0.01}
        state={ state }
        dispatch={ dispatch }
      />
    </div>
    <div className="toggles">
      <ToggleButton
        index="A"
        label="Toggle A"
        state={ state }
        dispatch={ dispatch }
      />
      <ToggleButton
        index="B"
        label="Toggle B"
        state={ state }
        dispatch={ dispatch }
      />      
    </div>
    <div className="triggers">
      <TriggerButton
        index="A"
        label="Trigger A"
        state={ state }
        dispatch={ dispatch }
      />
      <TriggerButton
        index="B"
        label="Trigger B"
        state={ state }
        dispatch={ dispatch }
      />
    </div>
    <XYPad
      xMin={ 0 } 
      xMax={ 100 } // Rango de frecuencia amplio
      yMin={ 0 } 
      yMax={ 100 }   // Rango típico para Q
      state={ state }
      dispatch={ dispatch }
    />
    <pre className="display">
      { JSON.stringify(state, null, 4) }
    </pre>
  </div>
}