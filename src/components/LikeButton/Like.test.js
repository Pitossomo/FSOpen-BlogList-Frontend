import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from '.'

describe('Like button', () => {
  test('call the like handler function twice when the like button is clicked twice', () => {

    const mockHandler = jest.fn()
    render(<LikeButton onClick={mockHandler} />)

    const button = screen.getByText('like')

    userEvent.click(button)

    expect(mockHandler.mock.toBeCalled(2))
  })
})