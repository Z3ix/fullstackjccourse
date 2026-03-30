import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTimedError, setTimedInfo } from "../reducers/notification";
import usersServices from "../services/users";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (arg, API) => {
    try {
      console.log("fetchUsersThunk run");
      const result = await usersServices.getAll();
      return result;
    } catch (e) {
      console.log("could not fetch users");
    }
  },
);

export const fetchUserByIdThunk = createAsyncThunk(
  "users/fetchById",
  async (arg, API) => {
    try {
      console.log("fetchUserById thunk run");
      const result = await usersServices.getById(arg);
      return [result];
    } catch {
      console.log("could not fetch user");
      return [{ name: "no such User" }];
    }
  },
);
