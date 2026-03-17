import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [extended, setExtended] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  async function addLike (e) {
    let newBlog = { ...blog, likes: likes + 1 }
    e.preventDefault()
    await updateBlog(newBlog)
    setLikes(newBlog.likes)
  }

  function deleteEntry(){
    if(confirm(`Are you sure want to delete ${blog.title} by ${blog.author}?`)){
      deleteBlog(blog)
    }
  }



  return ( //<div style = {displayStyle}>
    <div style = {blogStyle} className = 'blog'>
      {blog.title}
      <button onClick = {() => setExtended(!extended)}>{extended?'hide':'view'}</button>

      { extended && <div className ='url'>{blog.url}</div> }
      { extended && <div className ='likes'>Likes {likes}<button onClick={addLike}>like</button></div> }
      <div>{blog.author}</div>
      { extended && user.id == blog.user.id && <div><button onClick={deleteEntry}>delete</button></div> }


    </div>
  )
}

export default Blog