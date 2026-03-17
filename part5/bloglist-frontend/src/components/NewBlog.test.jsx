import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import { beforeEach, describe } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<NewBlog /> test', () => {
  let container
  const mockHandler = vi.fn()
  beforeEach(() => {
    const user = { id: '99' };

    ({ container } = render(<NewBlog createBlog ={mockHandler}/>))

  })

  test(' creating new blog', async () => {
    const newBlog = { title:'TestTitle', author: 'TestAuthor', url:'TestUrl' }
    const user = userEvent.setup()
    const title = screen.getByLabelText('title')
    await user.type(title, newBlog.title)
    const author = screen.getByLabelText('author')
    await user.type(author, newBlog.author)
    const url = screen.getByLabelText('url')
    await user.type(url, newBlog.url)
    const button = screen.getByText('Create')
    await user.click(button)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual(newBlog)
  })
})
