import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import LoginForm from '../components/LoginForm'

describe('login/logout tests', () => {
  test('login', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<LoginForm handleLogin={mockHandler} />)

    const usernameTextBox = screen.getByPlaceholderText('username')
    const passwordTextBox = screen.getByPlaceholderText('password')

    await user.type(usernameTextBox, 'test')
    await user.type(passwordTextBox, 'test')

    const submitButton = screen.getByText('login')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
