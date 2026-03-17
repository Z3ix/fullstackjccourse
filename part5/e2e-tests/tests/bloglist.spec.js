const { test, expect, beforeEach, describe } = require('@playwright/test')
const {login, createTestBlog} = require('../utils/helper')

describe('Blog app', () => {
  const user = {
        username: 'admin',
        name: 'Super Admin',
        password: 'testpass123'
      }
  const anotherUser = {
    username: 'visitor',
    name: 'Diego',
    password: 'bruteforceme'
  }
  
  const blog = {
    title: 'new age of ai. ai slop...',
    author: ' martin uther king',
    url: 'http://abyss.com/'
  }

  const blog1 = {
    title: 'blog1',
    author: 'author1',
    url: 'empty'
  }

  const blog2 = {
    title: 'blog2',
    author: 'author2',
    url: 'empty'
  }

  beforeEach(async ({ page, request }) => {
    await request.delete('http://localhost:5173/api/users',{data:{bypass: true}})
    await request.delete('http://localhost:5173/api/blogs',{data:{bypass: true}})
    await request.post('http://localhost:5173/api/users', {data: user} )
    await request.post('http://localhost:5173/api/users', {data: anotherUser} )

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.getByText('Log in').locator('..')
    const loginButton = loginForm.getByRole('button')
    expect(loginForm).toBeDefined()
    await expect(loginForm).toBeVisible()
    await expect(loginButton).toBeVisible()
    // ...
  })

  describe('Login tests', () => {

  
    test('Logging in with wrong credentials', async ({page}) => {
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill('123123123')
      await page.getByRole('button').click()
      const error = page.locator('.error')
      await expect(error).toBeVisible()
      await expect(error).toContainText('Incorrect')
    })

    test('logging with proper credentials ', async({page}) => {
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill(user.password)
      await page.getByRole('button').click()

      await expect(page.locator('.logged')).toContainText(`Logged as ${user.username}`)
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, user)
      await createTestBlog(page,blog)
    })

  test('a new blog can be created', async ({ page }) => {


    await expect(page.locator('.info')).toContainText('New blog');
    (await page.getByText(blog.title).all()).forEach(async item => await expect(item).toBeVisible())
    await expect(page.locator('.blog').getByText(blog.title)).toBeVisible()
    //await expect().toBeVisible()
  })

  test('adding likes', async ({ page }) => {

    await page.getByRole('button',{name: 'view'}).last().click()
    

    await page.getByRole('button', {name: 'like'}).last().click()
    await expect(page.getByText('Likes').last()).toContainText('1')


  })

  test('deleting blog', async ({page}) => {

    await page.getByRole('button',{name: 'view'}).last().click()
    page.on('dialog', async (dialog) =>{
      expect(dialog.type()).toBe('confirm')
      expect(dialog.message()).toContain('Are you sure')
      await dialog.accept()
    })

    await page.getByRole('button', {name: 'delete'}).last().click()
    await expect(page.locator('.blog')).not.toBeVisible()
    await expect(page.locator('.blog')).toHaveCount(0)

  })

  test('delete button invisible for unathorized user ', async ({page}) => {

    await page.getByRole('button', {name: 'log out'}).click()
    await login(page, anotherUser)
    await page.getByRole('button',{name: 'view'}).last().click()
    await expect(page.getByRole('button', {name: 'delete'})).toHaveCount(0)
  })

  test(' blogs are arranged according to the likes', async({page}) => {
    await createTestBlog(page,blog1)
    await createTestBlog(page,blog2)
    await page.getByRole('button',{name: 'view'}).first().click();
    await page.getByRole('button',{name: 'view'}).first().click();
    await page.getByRole('button',{name: 'view'}).first().click();
    

    await page.getByRole('button',{name: 'like'}).last().click()
    await expect(page.locator('.blog').first()).toContainText(blog2.title)
    await page.getByRole('button',{name: 'like'}).last().click()
    await expect(page.locator('.blog').nth(1)).toContainText(blog1.title)
    await page.getByRole('button',{name: 'like'}).nth(1).click()
    await expect(page.locator('.blog').first()).toContainText(blog1.title)


  })


})

})

