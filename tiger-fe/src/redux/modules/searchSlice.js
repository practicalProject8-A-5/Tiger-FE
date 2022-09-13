// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  filteredVehicleList: {},
  isLoading: false,
  success: null,
  error: null,
};

export const __vehicleSearchList = createAsyncThunk(
  "search/__vehicleSearchList",
  async (payload, thunkAPI) => {
    const {
      address,
      newStartDate,
      newEndDate,
      typeValue,
      locationX,
      locationY,
    } = payload;
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${serverApi}/vehicle/search`,
        {
          location: address,
          locationX: locationX,
          locationY: locationY,
          type: typeValue,
          startDate: newStartDate,
          endDate: newEndDate,
        },
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
      console.log(action.payload);
      state.filteredVehicleList = action.payload;
    },
    [__vehicleSearchList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = searchSlice.actions;
export default searchSlice.reducer;
