// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;
const initialState = {
  incomeItemList: {},
  isLoading: false,
  success: null,
  error: null,
};

const userToken = localStorage.getItem("userToken");
const refreshToken = localStorage.getItem("refreshToken");
const email = localStorage.getItem("email");

//등록 차량
export const __incomeItemList = createAsyncThunk(
  "main/__incomeItemList",
  async (payload, thunkAPI) => {
    if (email) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
        };
        const resp = await axios.get(
          `${serverApi}/vehicle`,
          // {},
          { headers: headers }
        );
        // console.log(resp.data);
        return thunkAPI.fulfillWithValue(resp.data.output.content);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const resp = await axios.get(
          `${serverApi}/vehicle`,
          // {},
          { headers: headers }
        );
        console.log(resp.data);
        return thunkAPI.fulfillWithValue(resp.data.output.content);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const incomeItemListSlice = createSlice({
  name: "incomeItemListSlice",
  initialState: initialState,
  reducers: {
    option: (state, action) => {
      state.incomeItemList = [];
    },
  },
  extraReducers: {
    [__incomeItemList.pending]: (state, action) => {
      state.isLoading = true;
      // console.log("pending");
    },
    [__incomeItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.incomeItemList = action.payload;
    },
    [__incomeItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { option } = incomeItemListSlice.actions;
export default incomeItemListSlice.reducer;
