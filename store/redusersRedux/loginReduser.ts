"use client";
import { UserResponse } from "@/models/UserResponse";
import AuthService from "@/services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: UserResponse;
  token: string;
  isLoading: boolean;
  error: any;
  isAuth: boolean;
  loginEroor: any;
  registerError: any;
}

const initalState: LoginState = {
  token: "",
  isLoading: false,
  error: "",
  user: {
    id: 0,
    user_email: "",
    user_name: "",
    user_role: "",
  },
  isAuth: false,
  loginEroor: "",
  registerError: null,
};
export const fetchLogin = createAsyncThunk(
  "login/fetch",
  async function (
    { user_email, password }: { user_email: string; password: string },
    { rejectWithValue }
  ) {
    try {
      const response = await AuthService.login(user_email, password);
      const data = response.data;
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchCheckLogin = createAsyncThunk(
  "checkToken/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const response = AuthService.checkIsAuth();
      const data = await response;
      return data.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      return rejectWithValue(error);
    }
  }
);
export const register = createAsyncThunk(
  "register/fetch",
  async function (
    {
      user_name,
      password,
      user_email,
    }: {
      user_name: string;
      password: string;
      user_email: string;
    },
    { rejectWithValue }
  ) {
    try {
      const response = await AuthService.registration(
        user_name,
        password,
        user_email
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: initalState,
  reducers: {
    clear: (state) => {
      state.user = initalState.user;
      state.error = "";
      state.token = "";
      state.isLoading = false;
      localStorage.removeItem("token");
      state.isAuth = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.loginEroor = "";
        state.error = "";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.loginEroor = "";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.loginEroor = action.payload;
      })
      .addCase(fetchCheckLogin.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchCheckLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(fetchCheckLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.registerError = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerError = "";
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.registerError = action.payload;
      }),
});

export default loginSlice.reducer;
export const { clear }: { clear: any } = loginSlice.actions;
