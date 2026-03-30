import { useContext, useState } from "react";
import { createBlog } from "../thunks/blog";
import { useDispatch } from "react-redux";
import { setTimedInfo, setTimedError } from "../reducers/notification.js";
import blogServices from '../services/blogs.js'
import { NotificationContext } from "../contexts.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const NewBlog = ({toggleNewBlogRef}) => {
  const {dispatchNotification} = useContext(NotificationContext)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: async (blog)=> {
      await blogServices.createBlog(blog)
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey:['blogs']})
      const id = setTimeout(() => {
            dispatchNotification({type: 'SETINFO', payload:{message: null, id:0}})
        }, 5000)
      const message = `New blog ${newBlog.title} by ${newBlog.author} added`
      dispatchNotification({type: 'SETINFO', payload:{message,id}})
      toggleNewBlogRef.current.toggleVisible();
    },
    onError: () => {
      console.log("error creating blog")
      const id = setTimeout(() => {
            dispatchNotification({type: 'SETERROR', payload:{message: null, id:0}})
        }, 5000)
      dispatchNotification({type: 'SETERROR', payload:{message:"Failed adding a blog",id}});
    }
  })
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  function blogChange(e) {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  }

  async function handleCreateNewBlog(e) {
    e.preventDefault();
    const result = createMutation.mutate(newBlog)
  }

  return (
    <form onSubmit={handleCreateNewBlog}>
      <h1> Add new blog</h1>
      <div>
        <label>
          title
          <input name="title" value={newBlog.title} onChange={blogChange} />
        </label>
      </div>
      <div>
        <label>
          author
          <input name="author" value={newBlog.author} onChange={blogChange} />
        </label>
      </div>
      <div>
        <label>
          url
          <input name="url" value={newBlog.url} onChange={blogChange} />
        </label>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default NewBlog;
