import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from '.'

describe('Like button', () => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      name: 'Pitossomo',
      username: 'Pitossomo',
      id: '5a422aa71b54a676234d17f4',
    },
  }

  test('call the like handler function twice when the like button is clicked twice', () => {
    const mockHandler = jest.fn()

    render(<LikeButton blog={blog} blogs={[blog]} setBlogs={mockHandler} />)

    const button = screen.getByText('like')
    userEvent.click(button)
    userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
