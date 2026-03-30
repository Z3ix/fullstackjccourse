import { createAsyncThunk } from "@reduxjs/toolkit";
import blogServices from '../services/blogs'
import { setTimedError, setTimedInfo } from "../reducers/notification";

export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async (arg, API) => {
        console.log('trying to despatch GetAll()')
        const result = await blogServices.getAll()
        console.log(result)
        return result
    }
)

export const createBlog = createAsyncThunk(
    'blogs/createBlog',
    async(arg,API) => {
        console.log('createing new blog')
        console.log(arg)
        const result = await blogServices.createBlog(arg)
        console.log('returned result')
        console.log(result)
        return result
    }
)

export const updateBlogThunk = createAsyncThunk(
    'blogs/updateBlog',
    async (arg, {dispatch}) => {
        console.log('updating blog')
        try {
            console.log('updating next blog data')
            console.log(arg)
            const result = await blogServices.updateBlog(arg)
            return result
        } catch (e) {
            dispatch(setTimedError("Blog update failed", 5));
            console.log(arg)
            console.log('we failed updating')
            console.log(e)
            return result
        }
    }
)

export const deleteBlogThunk = createAsyncThunk(
    'blogs/deleteBlog',
    async (arg, {dispatch}) => {
        console.log('deleting blog in Thunk')
        try {
            console.log(arg)
            const result = await blogServices.deleteBlog(arg)
            console.log('before dispatch')
            dispatch(setTimedInfo("Blog was deleted",5))
            return arg
        } catch(e) {
            console.log('error deleting blog in thunk')
            console.log(e)
            dispatch(setTimedError("Error occured deleting blog",5))
        }
    }
) 