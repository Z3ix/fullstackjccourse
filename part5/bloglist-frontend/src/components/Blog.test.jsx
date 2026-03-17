import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe } from 'vitest'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Blog for testing react',
  author: 'Your dearest',
  url: 'http://ht.tp/hello',
  likes: 18,
  user:{ id: '99' }
}
describe('<Blog /> test', () => {
  let container
  const mockHandler = vi.fn()
  beforeEach(() => {
    const user = { id: '99' };
    ({ container } = render(<Blog blog={blog} user = {user} updateBlog ={mockHandler}/>))

  })

  test('renders content properly', () => {

    const title = screen.getByText('Blog for testing react')
    const author = screen.getByText('Your dearest')
    const url = container.querySelector('.url')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(container.querySelector('.likes')).toBeNull()
  })

  test(' url and likes are shown after button click', async () => {


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const url = container.querySelector('.url')
    expect(url).not.toBeNull()
    expect(container.querySelector('.likes')).not.toBeNull()
    expect(screen.findByText(blog.likes)).toBeDefined()
  })
  test(' like button clocked twice responds correctly', async () => {


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likebutton = screen.getByText('like')
    await user.click(likebutton)
    await user.click(likebutton)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})