// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  isLike: false,
  isLoading: false,
  error: null,
};

const userToken = localStorage.getItem("userToken");
const refreshToken = localStorage.getItem("refreshToken");

// 찜하기
export const __isLike = createAsyncThunk(
  "like/__isLike",
  async (payload, thunkAPI) => {
    const vid = payload;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.post(
        `${serverApi}/vehicle/heart/${vid}`,
        {},
        { headers: headers }
      );
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const likeSlice = createSlice({
  name: "vehicleDetailSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__isLike.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__isLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.isLike = action.payload;
      // console.log(payload);
      // console.log(state.vehicleDetailList);
    },
    [__isLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = vehicleDetailSlice.actions;
export default likeSlice.reducer;
