import React, { 
  useRef, 
  useState, 
  useEffect 
} from 'react'

export default props => {

  const slotX = 'xypadX'
  const slotY = 'xypadY'

  const padRef = useRef(null)
  const handleRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)

  const markerLeft = ((props.state[slotX] - props.xMin) / (props.xMax - props.xMin)) * 100
  const markerBottom = ((props.state[slotY] - props.yMin) / (props.yMax - props.yMin)) * 100

  const calculateValues = (e) => {
    
    if (!padRef.current) return

    const rect = padRef.current.getBoundingClientRect()
    let clientX, clientY

    if (e.touches && e.touches.length > 0) {

      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY

    } else {

      clientX = e.clientX
      clientY = e.clientY
    }

    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (rect.bottom - clientY) / rect.height))

    const newX = x * (props.xMax - props.xMin) + props.xMin
    const newY = y * (props.yMax - props.yMin) + props.yMin

    props.dispatch({
      [slotX]: newX, 
      [slotY]: newY
    })
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    calculateValues(e)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    calculateValues(e)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      calculateValues(e)
    }
  }

  const handleTouchMove = (e) => {
    if (isDragging) {
      
      e.preventDefault()
      calculateValues(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {

    if (isDragging) {

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)

    } else {

      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    return () => {

      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

  }, [
    isDragging, 
    props.xMin, 
    props.xMax, 
    props.yMin, 
    props.yMax
  ])

  return (
    <div className="xypadwrapper">
      <div 
        ref={ padRef }
        className='xypad'
      >
        <div 
          className="handle"
          ref={ handleRef }
          onMouseDown={ handleMouseDown }
          onTouchStart={ handleTouchStart }
          style={{
            left: `${ markerLeft }%`,
            bottom: `${ markerBottom }%`, 
          }}
        />
      </div>
    </div>
  )
}