// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vehicleDetailList: {},
  isLoading: false,
  success: null,
  error: null,
};

export const __vehicleDetail = createAsyncThunk(
  "detail/__vehicleDetail",
  async (payload, thunkAPI) => {
    // const { address, newStartDate, newEndDate, value } = payload;
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://run.mocky.io/v3/3cdf08d4-f1f8-425b-8b11-aa9bdd1b675f",
        // `/api/vehicle/${vId}`,
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

export const vehicleDetailSlice = createSlice({
  name: "vehicleDetailSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__vehicleDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__vehicleDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.vehicleDetailList = action.payload;
    },
    [__vehicleDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = vehicleDetailSlice.actions;
export default vehicleDetailSlice.reducer;
