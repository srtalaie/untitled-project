import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import React from 'react'
import Blog from '../components/Blog'

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
    container = render(<Blog blog={blog} handleLike={mockHandler} />).container
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

    expect(linkElement).toBeDefined
    expect(likeElement).toBeDefined
  })
})
