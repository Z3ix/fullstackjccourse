import { createAsyncThunk } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

export const addCommentThunk = createAsyncThunk(
  "comments/addComment",
  async ({ id, content }, API) => {
    const result = await blogServices.postComment(id, content);
    console.log(result);
    return result;
  },
);
