import { useState } from 'react'



const NewBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  function blogChange(e) {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  function blogSubmit(e) {
    e.preventDefault()
    console.log('Submitting new Blog')
    console.log(newBlog)
    createBlog(newBlog)
  }

  return(
    <form onSubmit = {blogSubmit}>
      <h1> Add new blog</h1>
      <div>
        <label>
                    title
          <input name = "title" value = {newBlog.title} onChange={blogChange}/>
        </label>
      </div><div>
        <label>
                    author
          <input name = "author" value = {newBlog.author} onChange={blogChange}/>
        </label>
      </div><div>
        <label>
                    url
          <input name = "url" value = {newBlog.url} onChange={blogChange}/>
        </label>
      </div><div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

export default NewBlog