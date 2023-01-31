import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { Grid, List, ListItem, Typography } from '@mui/material'

const User = () => {
  let { id } = useParams()

  const user = useSelector((state) => state.users.find(user => user.id === id))

  if (!user) {
    return null
  }

  return (
    <Grid container direction={'column'}>
      <Typography variant='h4'>{user.name}</Typography>
      <Typography variant='h4'>Added blogs:</Typography>
      {user.blogs.length === 0 ? (
        <Grid item>
          <Typography variant='body1'>User does not have any blogs yet.</Typography>
        </Grid>
      ) : (
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog._id}>
              <Typography variant='body1'><Link to={`/blogs/${blog._id}`} style={{ textDecoration: 'none' }}>{blog.title}</Link></Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  )
}

export default User