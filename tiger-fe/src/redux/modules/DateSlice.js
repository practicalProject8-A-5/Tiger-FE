// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  DateList: {},
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
      // console.log(payload);
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        // `${serverApi}/vehicle/schedule/${vId}`,
        // await axios.get(
        `https://run.mocky.io/v3/476da7e6-de13-49e2-9658-d18c83185cdc`,
        {
          headers: headers,
        }
      );
      // console.log(resp.data.output);
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
      // console.log(action.payload);
      state.DateList = action.payload;

      const tempNoParsing = action.payload.reservedDateList;
      // console.log(tempNoParsing[0]);
      for (let i = 0; i < tempNoParsing.length; i++) {
        const temp = [];
        for (let i = 0; i < action.payload.reservedDateList.length; i++) {
          temp.push(action.payload.reservedDateList[i]);
        }
        state.temp = temp;
      }
    },
    [__getDateList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getDateListSlice.reducer;
