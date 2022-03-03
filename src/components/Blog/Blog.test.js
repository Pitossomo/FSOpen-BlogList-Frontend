import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '.'

describe('<Blog /> component', () => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      name: 'Pitossomo',
      username: 'Pitossomo',
      id: '5a422aa71b54a676234d17f4'
    }
  }

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} blogs={[blog]} setBlogs={() => {}} />).container
  })

  test('render title and author, but not url and num of likes by default', () => {
    const title = screen.getByText('React patterns')
    const author = screen.getByText('Michael Chan')
    const url = screen.getByText('https://reactpatterns.com/')
    const likes = screen.getByText('Likes: 7')

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('render url and num of likes when "show details" button is clicked once', () => {
    const button = container.querySelector('.showDetailsBtn')

    userEvent.click(button)

    const url = screen.getByText('https://reactpatterns.com/')
    const likes = screen.getByText('Likes: 7')

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })
})