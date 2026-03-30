import { createSlice } from "@reduxjs/toolkit";
import { fetchUserByIdThunk, fetchUsersThunk } from "../thunks/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        console.log("users payload");
        console.log(action.payload);
        return action.payload;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
