import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginServices from './services/login'
import './App.css'
import Notification from './components/Notification'

const App = () => {


  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const toggleNewBlogRef = useRef()


  const logged = !!user

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  async function createBlog(newBlog) {
    try {
      await blogService.createBlog(newBlog)
      setInfo(`New blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setInfo('')
      }, 5000)
      toggleNewBlogRef.current.toggleVisible()
    }
    catch (error){
      setError('Failed adding a blog')
      console.log(error)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
    try{
      let newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    }
    catch{
      alert('oopsi doopsy 2')
    }
  }

  async function deleteBlog(blog) {
    try {
      const response = await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(item => item.id != blog.id))
      setInfo('Blog was deleted')
      setTimeout(() => {
        setInfo('')
      }, 5000)
      return response
    }
    catch {
      setError('Blog deletion failed')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  async function updateBlog(blog) {
    try{
      const response = await blogService.updateBlog(blog)
      setBlogs(blogs.map(item => item.id==blog.id?blog:item))
      return response
    }
    catch {
      setError('Blog update failed')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  async function loginHandler (e) {
    e.preventDefault()
    try {
      let response = await loginServices.login({ username,password })
      blogService.setToken(response.token)
      window.localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
      setUsername('')
      setPassword('')
    }
    catch {
      setError('Incorrect login or password')
      setTimeout(() => {
        setError('')
      }, 5000)
      setPassword('')
    }
  }

  function logOut () {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  function renderLoginForm() {
    return (
      <form onSubmit={loginHandler}>
        <h1>Log in</h1>
        <div>
          <label>
            username
            <input value = {username} onChange = {({ target }) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input value = {password} onChange = {({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <button type="submit" name ="login">login</button>
      </form>

    )
  }

  function renderLogged() {
    return(
      <div className='logged'>Logged as {user.username} <button onClick={logOut}>log out</button></div>
    )
  }

  function renderBlogs() {
    return(
      <div>
        <Togglable label = 'Create new blog' ref = {toggleNewBlogRef}>
          <NewBlog createBlog = {createBlog}/>
        </Togglable>
        <h2>blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog = {deleteBlog} user={user}/>
        )}
      </div>
    )

  }

  return (
    <div>
      <Notification error = {error} info = {info} />
      {!logged && renderLoginForm()}
      {logged && renderLogged() }
      {logged && renderBlogs()}
    </div>
  )
}

export default App