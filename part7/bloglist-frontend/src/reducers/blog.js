import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  createBlog,
  updateBlogThunk,
  deleteBlogThunk,
  fetchBlogByIdThunk,
} from "../thunks/blog";
import { addCommentThunk } from "../thunks/comments";
const blogSlice = createSlice({
  name: "blogs",
  initialState: { items: [] },
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        console.log("thunk fulfilled");
        console.log(action);
        state.items = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        console.log("blog created");
        console.log(action.payload);
        state.items.push(action.payload);
      })
      .addCase(updateBlogThunk.fulfilled, (state, action) => {
        console.log("update blog fulfiled , payload:");
        console.log(action.payload);
        state.items = state.items.map((item) =>
          item.id == action.payload.id ? action.payload : item,
        );
      })
      .addCase(deleteBlogThunk.fulfilled, (state, action) => {
        console.log("updating bloglist after delete");
        console.log(action.payload);
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      })
      .addCase(fetchBlogByIdThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        const blog = state.items.find((item) => item.id == action.payload.blog);
        blog.comments.push(action.payload);
        state.items = state.items.map((item) =>
          item.id == action.payload.blog ? blog : item,
        );
      });
  },
});

export default blogSlice.reducer;
