// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serverApi = process.env.REACT_APP_SERVER;
const kakaoApi = process.env.REACT_APP_KAKAO_LOGIN_API;

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

export const __registerUser = createAsyncThunk(
  "member/__registerUser",
  async ({ email, password, passwordConfirm, name }, thunkAPI) => {
    try {
      // make request to backend
      const response = await axios.post(
        `${serverApi}/member/register`,
        { email, password, passwordConfirm, name },
        config
      );
      toast.success("회원가입 성공", {
        theme: "dark",
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
        className: "toatst_success",
        // bodyClassName: "",
        progressClassName: "success_progress",
      });
      // console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      toast.error("회원가입 실패", {
        theme: "dark",
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
        className: "toatst_error",
        // bodyClassName: "",
        progressClassName: "error_progress",
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __userLogin = createAsyncThunk(
  "member/__userLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${serverApi}/member/login`,
        { email, password },
        config
      );
      localStorage.setItem("userToken", response.headers.authorization);
      localStorage.setItem("email", response.data.output.email);
      localStorage.setItem("phone", response.data.output.tel);
      localStorage.setItem("name", response.data.output.name);
      localStorage.setItem("id", response.data.output.id);
      localStorage.setItem("refreshToken", response.headers.refreshtoken);
      localStorage.setItem("profileImage", response.data.output.profileImage);
      // console.log(response.data);
      toast.success("로그인 성공", {
        theme: "dark",
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
        className: "toatst_success",
        // bodyClassName: "",
        progressClassName: "success_progress",
      });
      loader();
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __kakaoLogin = createAsyncThunk(
  "member/__kakaoLogin",
  async (payload, thunkAPI) => {
    const code = payload;
    try {
      const response = await axios.get(
        kakaoApi + `/user/kakao/callback?code=${code}`,
        {}
      );
      // console.log(response);
      localStorage.setItem("userToken", response.headers.authorization);
      localStorage.setItem("email", response.data.output.email);
      localStorage.setItem("phone", response.data.output.tel);
      localStorage.setItem("id", response.data.output.id);
      localStorage.setItem("profileImage", response.data.output.profileImage);
      localStorage.setItem("name", response.data.output.name);
      localStorage.setItem("refreshToken", response.headers.refreshtoken);
      toast.success("카카오로그인 성공", {
        theme: "dark",
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
        className: "toatst_success",
        // bodyClassName: "",
        progressClassName: "success_progress",
      });
      loader();
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      // console.log(error);
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
      const profileImage = localStorage.getItem("profileImage");
      const id = localStorage.getItem("id");
      // console.log(payload);
      if (userToken !== null) {
        state.userInfo = { email, phone, name, profileImage, id };
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
      // console.log(payload);
      state.userInfo = payload;
    },
    [__userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      // console.log(payload);
      state.error = payload;
    },
    // 카카오 로그인
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [__kakaoLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      // console.log(payload);
      state.userInfo = payload;
    },
    [__kakaoLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      // console.log(payload);
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
