import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.slice().sort((a, b) => (b.likes - a.likes)))

  return (
    <Grid
      container
      style={{ minHeight: '80vh' }}>
      {blogs === null ? (
        <h3>No blogs yet</h3>
      ) : (
        <Grid
          container
          spacing={4}
          justify="center"
          justifyContent={'space-evenly'}
        >
          {blogs.map(blog =>
            <Grid item key={blog._id}>
              <Link to={`blogs/${blog._id}`} style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <Card>
                    <CardMedia
                      component="img"
                      src="https://picsum.photos/140"
                      alt="img"
                    ></CardMedia>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {blog.title} by {blog.author}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            </Grid>
          )}
        </Grid>
      )
      }
    </Grid>
  )
}

export default BlogList