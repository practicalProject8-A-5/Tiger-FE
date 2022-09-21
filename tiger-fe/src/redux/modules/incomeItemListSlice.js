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

// const userToken = localStorage.getItem("userToken");
// const refreshToken = localStorage.getItem("refreshToken");

//등록 차량
export const __incomeItemList = createAsyncThunk(
  "main/__incomeItemList",
  async (payload, thunkAPI) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        `${serverApi}/vehicle`,
        // {},
        { headers: headers }
      );
      // console.log(resp.data);
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const incomeItemListSlice = createSlice({
  name: "incomeItemListSlice",
  initialState: initialState,
  reducers: {},
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

// export const {} = incomeItemListSlice.actions;
export default incomeItemListSlice.reducer;
