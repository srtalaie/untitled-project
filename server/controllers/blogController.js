const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

//Get a Blog
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//Get All Blogs
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find({ _id: request.params.id })
  response.json(blog)
})

//Create a Blog
blogRouter.post('/', async (request, response) => {
  const { body } = request

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

//Update a Blog
blogRouter.put('/:id', async (request, response) => {
  const { userId, title, author, url, likes, comments } = request.body

  const blog = {
    title,
    author,
    url,
    likes,
    comments,
    user: userId,
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const blogToBeUpdated = await Blog.findById({ _id: request.params.id })

  if (decodedToken.id.toString() === blogToBeUpdated.user._id.toString()) {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: request.params.id },
      blog,
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedBlog)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

//Delete a Blog
blogRouter.delete('/:id', async (request, response) => {
  const { user } = request

  const blogToBeDeleted = await Blog.findById({ _id: request.params.id })

  if (user.id.toString() === blogToBeDeleted.user._id.toString()) {
    const deletedBlog = await Blog.findOneAndDelete({
      _id: request.params.id,
    })
    response.send(deletedBlog)

    user.blogs = user.blogs.filter(
      (blog) => String(blog) !== blogToBeDeleted.id
    )

    await user.save()

    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

module.exports = blogRouter
