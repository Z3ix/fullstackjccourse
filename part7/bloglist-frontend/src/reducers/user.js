import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, isLoading: true },
  reducers: {
    setUser(state, action) {
      return { user: action.payload, isLoading: false };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
