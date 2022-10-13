const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Get All Users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

// Get Specific User
usersRouter.get('/:id', async (request, response) => {
  const user = await User.find({ _id: request.params.id }).populate('blogs')
  response.json(user)
})

// Create New User
usersRouter.post('/', async (request, response) => {
  const { username, name, password, email } = request.body

  const pwRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  if (username.length < 3) {
    return response.status(400).json({
      error: 'Username must be at least 3 characters',
    })
  }

  if (!pwRegEx.test(password)) {
    return response.status(400).json({
      error: 'Password must be at least 8 characters long, contain an upper and lower case character, and contain at least 1 special character',
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
