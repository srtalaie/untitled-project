/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')

const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./helpers/blogHelpers')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('Blogs removed')

  const blogArr = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArr = blogArr.map((blog) => blog.save())
  await Promise.all(promiseArr)

  console.log('Done')
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs contain _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach((blog) => {
    expect(blog._id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
