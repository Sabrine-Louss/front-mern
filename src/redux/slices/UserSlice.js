import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "Register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "LoginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/login", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuth: Boolean(localStorage.getItem("isAuth")) || false,
    errors: false,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers: {
    [RegisterUser.pending]: (state) => {
      state.isLoading = true;
    },
    [RegisterUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errors = false;
      state.isAuth = true;
      state.token = action.payload.token;
      localStorage.setItem("token",state.action);
      localStorage.setItem("isAuth",state.action);
    },
    [RegisterUser.rejected]: (state, action) => {
      state.errors = action.payload.error;
      state.isAuth = false;
    
    },

    [LoginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errors = false;
      state.isAuth = true;
      state.token = action.payload.token;
      localStorage.setItem("token",state.action);
      localStorage.setItem("isAuth",state.action);
    },
    [LoginUser.rejected]: (state, action) => {
      state.errors = action.payload.error;
      state.isAuth = false;
    
    },
  },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
