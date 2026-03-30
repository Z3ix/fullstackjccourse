import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs } from "../thunks/blog";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    info: {
      message: null,
      current: 0,
    },
    error: {
      message: null,
      current: 0,
    },
  },
  reducers: {
    setInfo(state, action) {
      if (state.info.current) {
        console.log("need to clear");
        clearTimeout(state.info.current);
      }
      state.info.message = action.payload.message;
      state.info.current = action.payload.id;
    },
    setError(state, action) {
      console.log("current timer id ", state.error.current);

      if (state.error.current) {
        console.log("need to clear");
        clearTimeout(state.error.current);
      }
      state.error.message = action.payload.message;
      state.error.current = action.payload.id;
    },
  },
});

export const setTimedInfo = (message, delay) => {
  return async (dispatch) => {
    const id = setTimeout(() => {
      dispatch(setInfo({ message: null, id: 0 }));
    }, delay * 1000);
    dispatch(setInfo({ message, id }));
  };
};
export const setTimedError = (message, delay) => {
  return async (dispatch) => {
    const id = setTimeout(() => {
      dispatch(setError({ message: null, id: 0 }));
    }, delay * 1000);
    dispatch(setError({ message, id }));
  };
};

export const { setInfo, setError } = notificationSlice.actions;
export default notificationSlice.reducer;
