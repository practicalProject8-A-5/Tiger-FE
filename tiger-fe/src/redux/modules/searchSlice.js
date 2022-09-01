// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  filteredVehicleList: [],
  isLoading: false,
  success: null,
  error: null,
};

export const __vehicleSearchList = createAsyncThunk(
  "search/__vehicleSearchList",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        "/api/vehicle/search",
        {
          // startDate : "2022-08-02",
          // endDate : "2022-08-07",
          // location : "",
          // type : "세단"
        },
        { headers: headers }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__vehicleSearchList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__vehicleSearchList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.filteredVehicleList = action.payload;
      // console.log(action.payload);
    },
    [__vehicleSearchList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = jobDetailSlice.actions;
export default searchSlice.reducer;
