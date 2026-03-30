
import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs, createBlog, updateBlogThunk, deleteBlogThunk } from "../thunks/blog";
const blogSlice = createSlice({
    name: 'blogs',
    initialState: {items: []},
    reducers:{
        setBlogs(state, action){
            return action.payload
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchBlogs.fulfilled, (state,action) => {
            console.log('thunk fulfilled')
            console.log(action)
            state.items = action.payload;
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            console.log('blog created')
            console.log(action.payload)
            state.items.push(action.payload)
        })
        .addCase(updateBlogThunk.fulfilled, (state, action) => {
            console.log('updating bloglist')
            console.log(action.payload)
            state.items = state.items.map(item => item.id == action.payload.id? action.payload: item)
        })
        .addCase(deleteBlogThunk.fulfilled, (state,action) => {
            console.log('updating bloglist after delete')
            console.log(action.payload)
            state.items = state.items.filter(item => item.id !== action.payload.id)
        })
    }
    
})

export default blogSlice.reducer
