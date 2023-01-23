import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createABlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Button, FormControl, Grid, TextField } from '@mui/material'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      dispatch(createABlog(newBlog))
      dispatch(setNotification(`A new blog was created: ${newBlog.title} by ${newBlog.author}`, 3000))
    } catch (exception) {
      dispatch(setNotification('Something went wrong'))
    }

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item direction={'column'}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                value={title}
                name="Title"
                id="title"
                label="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                value={author}
                name="Author"
                id="author"
                label="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                value={url}
                name="Url"
                id="url"
                label="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </FormControl>
          </Grid>
          <Button variant="outlined" type="submit" id="submit-btn">Create</Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default BlogForm
