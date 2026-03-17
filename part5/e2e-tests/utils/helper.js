const login = async (page, user)  => {
  await page.getByLabel('username').fill(user.username)
  await page.getByLabel('password').fill(user.password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createTestBlog = async (page, blog) => {
    await page.getByRole('button',{name: 'Create new blog'}).click()
    await page.getByLabel('title').fill(blog.title)
    await page.getByLabel('author').fill(blog.author)
    await page.getByLabel('url').fill(blog.url)
    await page.getByRole('button',{name:'Create'}).click()
    await page.locator('.blog').getByText(blog.title).waitFor()
}
export { login, createTestBlog }