// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  renterItemLists: {},
  isLoading: false,
  result: null,
  error: null,
  status: 0,
};

// 렌터페이지 navbar 상태 불러오기
export const __getRenterItemList = createAsyncThunk(
  "renter/__getRenterItemList",
  async (payload, thunkAPI) => {
    const status = payload;
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (status === "LIKE") {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
        };
        const responseLiked = await axios.get(`${serverApi}/heart/vehicle`, {
          headers: headers,
        });
        return thunkAPI.fulfillWithValue(responseLiked.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
        };
        const response = await axios.get(
          serverApi + `/order/renter?status=${status}&limit=100&offset=0`,
          { headers: headers }
        );
        return thunkAPI.fulfillWithValue(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  }
);

const renterItemListSlice = createSlice({
  name: "renterItemListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getRenterItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getRenterItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.renterItemLists = action.payload;
    },
    [__getRenterItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default renterItemListSlice.reducer;
