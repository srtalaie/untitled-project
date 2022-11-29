import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

describe('blog component tests', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Test',
    url: 'www.test.com',
    like: 10,
  }

  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleUpdate={mockHandler} />
    ).container
  })

  test('renders content', () => {
    const visibleElement = screen.getByText(`${blog.title} - ${blog.author}`)
    const linkElement = container.querySelector('.blog-link')
    const likeElement = container.querySelector('.blog-likes')

    expect(visibleElement).toBeDefined()
    expect(linkElement).toBeNull()
    expect(likeElement).toBeNull()
  })

  test('clicking the button calls event handler once', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#view-hide-btn')
    await user.click(button)

    const linkElement = container.querySelector('.blog-link')
    const likeElement = container.querySelector('.blog-likes')

    expect(linkElement).toBeDefined()
    expect(likeElement).toBeDefined()
  })

  test('clicking the like button likes the blog', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#view-hide-btn')
    await user.click(button)

    const likeButton = container.querySelector('.like-btn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('blog form tests', () => {
  test('user is able to create a blog', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleCreateBlog={mockHandler} />)

    const titleTextBox = screen.getByPlaceholderText('Title')
    const authorTextBox = screen.getByPlaceholderText('Author')
    const urlTextBox = screen.getByPlaceholderText('Url')

    await user.type(titleTextBox, 'Testing Tests')
    await user.type(authorTextBox, 'Test Test')
    await user.type(urlTextBox, 'www.test.test')

    const submitButton = screen.getByText('Create')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Testing Tests')
    expect(mockHandler.mock.calls[0][0].author).toBe('Test Test')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.test.test')
  })
})
