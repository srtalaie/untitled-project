/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const helper = require('./helpers/blogHelpers')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  helper.initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  })
  console.log('done')
})

describe('Server response', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Database indexed correctly', () => {
  test('unique identifier _id exists', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach((blog) => {
      expect(blog._id).toBeDefined()
    })
  })
})

describe('User able to preform basic functions in DB', () => {
  let token
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pass1234', 10)
    const user = await new User({
      email: 'test@test.com',
      username: 'NEW_USER',
      passwordHash,
    }).save()

    const userSignIn = { username: 'NEW_USER', id: user.id }
    return (token = jwt.sign(userSignIn, process.env.SECRET))
  })

  test('able to create new blog post and blog is saved to DB', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'www.blog.com',
      likes: 9000,
      comments: [],
      userId: '1',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(4)
  })

  test('if user is able to successfully delete a blog', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'www.blog.com',
      likes: 9000,
      comments: [],
      userId: '1',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    const response = await api.get('/api/blogs')

    const blogToBeDeletedID = response.body.at(-1)._id

    await api
      .delete(`/api/blogs/${blogToBeDeletedID}`)
      .set('Authorization', `Bearer ${token}`)

    const newResponseWithoutDeletedBlog = await Blog.find({
      _id: blogToBeDeletedID,
    })

    expect(newResponseWithoutDeletedBlog).toEqual([])
  })

  test('if user is able to successfully update a blog', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'www.blog.com',
      likes: 9000,
      comments: [],
      userId: '1',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    const blogToBeUpdatedID = response.body._id

    await api
      .put(`/api/blogs/${blogToBeUpdatedID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ likes: 123 })

    const newResponseWithUpdatedBlog = await api.get(
      `/api/blogs/${blogToBeUpdatedID}`
    )

    const likes = newResponseWithUpdatedBlog.body[0].likes

    expect(likes).toEqual(123)
  })

  test('if likes property is missing, default to 0', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'www.blog.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogWithZeroLikes = await Blog.find({ title: 'New Blog' })

    expect(blogWithZeroLikes[0].likes).toEqual(0)
  })

  test('if missing title/url then api responds with 400 error', async () => {
    const newBadBlog = {
      author: 'New Author',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBadBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
