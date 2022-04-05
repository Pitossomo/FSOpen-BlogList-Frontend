import { Button } from '@mui/material'
import React, { useState } from 'react'

const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='outlined' size='medium' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='text' onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Toggable
