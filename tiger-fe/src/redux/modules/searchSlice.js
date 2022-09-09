// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  filteredVehicleList: {},
  isLoading: false,
  success: null,
  error: null,
};

export const __vehicleSearchList = createAsyncThunk(
  "search/__vehicleSearchList",
  async (payload, thunkAPI) => {
    const { address, newStartDate, newEndDate, typeValue } = payload;
    try {
      console.log(address);
      console.log(newStartDate);
      console.log(newEndDate);
      console.log(typeValue);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `/api/vehicle/search?startDate=${newStartDate}?endDate=${newEndDate}?type=${typeValue}?location=${address}`,
        {},
        { headers: headers }
      );
      console.log(response.data);
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

// export const {} = searchSlice.actions;
export default searchSlice.reducer;
