import { forwardRef, useImperativeHandle, useState } from 'react'

import PropTypes from 'prop-types'

import { Button, Grid } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Grid container>
      <Grid item style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Grid>
      <Grid item style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </Grid>
    </Grid>
  )
})

export default Togglable
