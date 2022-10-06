// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  DateList: {
    openDateList: [],
    reservedDateList: [],
  },
  temp: [],
  isLoading: false,
  success: null,
  error: null,
};

// 날짜
export const __getDateList = createAsyncThunk(
  "owner/__getDateList",
  async (payload, thunkAPI) => {
    try {
      const vId = payload;
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(`${serverApi}/vehicle/schedule/${vId}`, {
        headers: headers,
      });
      return thunkAPI.fulfillWithValue(resp.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getDateListSlice = createSlice({
  name: "getDateListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //등록
    [__getDateList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getDateList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DateList = action.payload;
    },
    [__getDateList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getDateListSlice.reducer;
