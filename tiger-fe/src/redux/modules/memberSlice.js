// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initialize userToken from local storage
// const userToken = localStorage.getItem("userToken")
//   ? localStorage.getItem("userToken")
//   : null;

// const refreshToken = localStorage.getItem("refreshToken")
//   ? localStorage.getItem("refreshToken")
//   : null;

const initialState = {
  isLoading: false,
  result: false, // for monitoring the registration process.
  error: null,
  userInfo: null, // for user object
  // userToken, // for storing the JWT
  // refreshToken,
  // success: false, // for monitoring the registration process.
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
  async ({ email, password, passwordConfirm, name, phone }, thunkAPI) => {
    try {
      // make request to backend
      const response = await axios.post(
        "api 추후 추가 예정",
        { email, password, passwordConfirm, name, phone },
        config
      );
      window.alert("회원가입 성공");
      return thunkAPI.fulfillWithValue(response);
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
        "추후 추가 예정",
        { email, password },
        config
      );
      // console.log(response);
      if (response.data.success === false) {
        window.alert(response.data.error.message);
        return thunkAPI.rejectWithValue();
      } else {
        // store user's token in local storage
        localStorage.getItem("userToken", response.headers.authorization);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("refreshToken", response.headers.refreshtoken);
        // console.log(response);
        window.alert("로그인 성공");
        return thunkAPI.fulfillWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const memberSlice = createSlice({
  name: "memberSlice",
  initialState: initialState,
  reducers: {
    loader: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    //등록
    [__userLogin.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [__userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      // console.log(payload);
    },
    [__userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      // console.log(payload);
    },
    // register user
    [__registerUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [__registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.result = true; // registration successful
    },
    [__registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

// export const {} = memberSlice.actions;
export default memberSlice.reducer;
