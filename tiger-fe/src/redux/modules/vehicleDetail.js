// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  filteredVehicleList: {},
  vehicleDetails: {},
  isLoading: false,
  success: null,
  error: null,
  vehicleDates: {},
};

// single vehicle info
export const __vehicleDetail = createAsyncThunk(
  "detail/__vehicleDetail",
  async (payload, thunkAPI) => {
    const { vId, startDate, endDate } = payload;
    console.log(vId);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (startDate === null && endDate === null) {
        const responseNull = await axios.get(
          `${serverApi}/vehicle/${vId}?startDate=&endDate=`,
          { headers: headers }
        );
        console.log(responseNull.data.output);
        return thunkAPI.fulfillWithValue(responseNull.data.output);
      } else {
        const response = await axios.get(
          `${serverApi}/vehicle/${vId}?startDate=${startDate}&endDate=${endDate}`,
          { headers: headers }
        );
        return thunkAPI.fulfillWithValue(response.data.output);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 검색된 차량 리스트 생성
export const __vehicleSearchList = createAsyncThunk(
  "detail/__vehicleSearchList",
  async (payload, thunkAPI) => {
    const { location, startDate, endDate, type, locationX, locationY } =
      payload;
    console.log(location);
    console.log(startDate);
    console.log(endDate);
    console.log(type);
    console.log(locationX);
    console.log(locationY);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${serverApi}/vehicle/search`,
        {
          location: location,
          locationX: locationX,
          locationY: locationY,
          type: type,
          startDate: startDate,
          endDate: endDate,
        },
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
      // console.log(actions);
      state.vehicleDates = action.payload;
      state.vehicleDetails = action.payload.vehicleList;
      // console.log(payload);
      console.log(state.vehicleDetailList);
    },
    [__vehicleDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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

// export const {} = vehicleDetailSlice.actions;
export default vehicleDetailSlice.reducer;
