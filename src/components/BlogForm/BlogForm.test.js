import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from '.'
import userEvent from '@testing-library/user-event'

describe('<BlogForm /> component', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: {
      name: 'Pitossomo',
      username: 'Pitossomo',
      id: '5a422aa71b54a676234d17f4'
    }
  }

  test('calls the event handler received as props with the right details when a new blog is created', () => {
    const mockHandler = jest.fn()

    const { container } = render(<BlogForm handleNewBlog={mockHandler} />)

    const titleField = container.querySelector('#titleInput')
    const authorField = container.querySelector('#authorInput')
    const urlField = container.querySelector('#urlInput')

    userEvent.type(titleField, blog.title)
    userEvent.type(authorField, blog.author)
    userEvent.type(urlField, blog.url)
  })
})