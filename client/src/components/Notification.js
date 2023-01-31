import { useSelector } from 'react-redux'

import { Grid, Typography } from '@mui/material'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message === null) return null

  return (
    <Grid item id="notification"><Typography variant='body1'>{message}</Typography></Grid>
  )
}

export default Notification