// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const refreshToken = localStorage.getItem("refreshToken")
  ? localStorage.getItem("refreshToken")
  : null;

const initialState = {
  isLoading: false,
  result: false, // for monitoring the registration process.
  error: null,
  userInfo: {},
  refreshToken,
  userToken,
};

// configure header's Content-Type as JSON
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//등록 차량
export const __registerUser = createAsyncThunk(
  "member/__registerUser",
  async ({ email, password, passwordConfirm, name }, thunkAPI) => {
    try {
      // make request to backend
      const response = await axios.post(
        "http://43.200.177.2/api/member/register",
        { email, password, passwordConfirm, name },
        config
      );
      window.alert("회원가입 성공");
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      window.alert("회원가입 실패!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//예약 주문
export const __userLogin = createAsyncThunk(
  "member/__userLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://43.200.177.2/api/member/login",
        { email, password },
        config
      );
      localStorage.setItem("userToken", response.headers.authorization);
      localStorage.setItem("email", response.data.output.email);
      localStorage.setItem("phone", response.data.output.tel);
      localStorage.setItem("name", response.data.output.name);
      localStorage.setItem("refreshToken", response.headers.refreshtoken);
      console.log(response.data);
      window.alert("로그인 성공");
      loader();
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const memberSlice = createSlice({
  name: "memberSlice",
  initialState: initialState,
  reducers: {
    loader: (state, action) => {
      const email = localStorage.getItem("email");
      const phone = localStorage.getItem("phone");
      const name = localStorage.getItem("name");
      // console.log(payload);
      if (userToken !== null) {
        state.userInfo = { email, phone, name };
      } else {
        state.userInfo = {};
      }
    },
  },
  extraReducers: {
    //로그인
    [__userLogin.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [__userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      state.userInfo = payload;
    },
    [__userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      state.error = payload.message;
    },
    // register user
    [__registerUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [__registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.result = payload.result;
    },
    [__registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { loader } = memberSlice.actions;
export default memberSlice.reducer;
