import { useSelector, useDispatch } from "react-redux"
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import { useRef, useEffect,useContext } from "react";
import { deleteBlogThunk, fetchBlogs, updateBlogThunk } from "../thunks/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogServices from '../services/blogs'
import { NotificationContext } from "../contexts";

const BlogList = () => {
    const {dispatchNotification} = useContext(NotificationContext)
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.items) 
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    const toggleNewBlogRef = useRef();
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
      mutationFn: async (blog) =>{
        await blogServices.deleteBlog(blog)
        return blog
      },
      onSuccess: (blog) => {
        queryClient.setQueryData(['blogs'], (blogs)=>{
          let newblogs = blogs.filter(item => item.id !== blog.id)
          console.log('new blogs')
          console.log(newblogs)
          return newblogs
        })
        const id = setTimeout(() => {
          dispatchNotification({type: 'SETINFO', payload:{message: null, id:0}})
          }, 5000)
        dispatchNotification({type: 'SETINFO', payload:{message:`Blog ${blog.title} by ${blog.author} removed`,id}});
      }
    })
    const voteMutation = useMutation({
      mutationFn: async (blog) => {
        return await blogServices.updateBlog(blog)
      },
      onSuccess: (response) => {
        queryClient.setQueryData(['blogs'],(blogs)=>{
          return blogs?.map(item => item.id==response.id?response:item)
        })
      },
      onError: () => {
        const id = setTimeout(() => {
              dispatchNotification({type: 'SETERROR', payload:{message: null, id:0}})
          }, 5000)
        dispatchNotification({type: 'SETERROR', payload:{message:"Failed adding Like",id}});
      }
    })

   

    const user = useSelector(state => state.user)

    

    useEffect(() => {
        console.log('inside effect')
        dispatch(fetchBlogs())
        console.log('dispatched')
    }, [dispatch]);

    const blogsToDisplay = useQuery({
      queryKey: ['blogs'],
      queryFn: async () => {
        return await blogServices.getAll()
      }
    })

    if (blogsToDisplay.isError) return <div>Can't fetch blogs</div>
    if (blogsToDisplay.isPending) return <div>Loading blogs</div>
    
    const sortedBlogsToDisplay = [...blogsToDisplay.data].sort((a, b) => b.likes - a.likes)



    async function updateBlog(blog) {
      voteMutation.mutate(blog)

      //  dispatch(updateBlogThunk(blog))

      /*try {
        const response = await blogService.updateBlog(blog);
        setBlogs(blogs.map((item) => (item.id == blog.id ? blog : item)));
        return response;
      } catch {
        dispatch(setError("Blog update failed"));
        setTimeout(() => {
          dispatch(setError(""));
        }, 5000);
      }*/
    }
    async function deleteBlog(blog) {
      deleteMutation.mutate(blog)



      //dispatch(deleteBlogThunk(blog))
      /*
      try {
        const response = await blogService.deleteBlog(blog);
        setBlogs(blogs.filter((item) => item.id != blog.id));
        dispatch(setInfo("Blog was deleted"));
        setTimeout(() => {
          dispatch(setInfo(""));
        }, 5000);
        return response;
      } catch {
        dispatch(setError("Blog deletion failed"));
        setTimeout(() => {
          dispatch(setError(""));
        }, 5000);
      }*/
    }
    
    console.log('blogs are')
    console.log(blogsToDisplay.data)
    return (
        <div>
            <Togglable label="Create new blog" ref={toggleNewBlogRef}>
            <NewBlog toggleNewBlogRef = {toggleNewBlogRef} />
            </Togglable>
            <h2>blogs</h2>
            {sortedBlogsToDisplay
            .map((blog) => (
                <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
                />
            ))}
        </div>
    )
}

export default BlogList