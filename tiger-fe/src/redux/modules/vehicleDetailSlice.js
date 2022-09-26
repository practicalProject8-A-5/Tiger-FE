// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  filteredVehicleList: [],
  vehicleDetails: {},
  commentList: {},
  isLoading: false,
  error: null,
};

const email = localStorage.getItem("email");
const userToken = localStorage.getItem("userToken");
const refreshToken = localStorage.getItem("refreshToken");

// vehicle detail page
export const __vehicleDetail = createAsyncThunk(
  "detail/__vehicleDetail",
  async (payload, thunkAPI) => {
    const { vId, startDate, endDate } = payload;
    // console.log(vId);
    if (email) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
        };
        if (startDate === null && endDate === null) {
          const responseNull = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=&endDate=`,
            { headers: headers }
          );
          // console.log(responseNull.data.output);
          return thunkAPI.fulfillWithValue(responseNull.data.output);
        } else {
          const response = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=${startDate}&endDate=${endDate}`,
            { headers: headers }
          );
          console.log(response.data.output);
          return thunkAPI.fulfillWithValue(response.data.output);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        if (startDate === null && endDate === null) {
          const responseNull = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=&endDate=`,
            { headers: headers }
          );
          // console.log(responseNull.data.output);
          return thunkAPI.fulfillWithValue(responseNull.data.output);
        } else {
          const response = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=${startDate}&endDate=${endDate}`,
            { headers: headers }
          );
          console.log(response.data.output);
          return thunkAPI.fulfillWithValue(response.data.output);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

// 검색된 차량 리스트 생성
export const __vehicleSearchList = createAsyncThunk(
  "detail/__vehicleSearchList",
  async (payload, thunkAPI) => {
    const { location, startDate, endDate, type, locationX, locationY } =
      payload;
    if (email) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
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
        console.log(response.data.output);
        return thunkAPI.fulfillWithValue(response.data.output);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    } else {
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
        console.log(response.data.output);
        return thunkAPI.fulfillWithValue(response.data.output);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

// 리뷰 & 평점 리스트 조회하기
export const __vehicleComments = createAsyncThunk(
  "detail/__vehicleComments",
  async (payload, thunkAPI) => {
    const vid = payload;
    console.log(vid);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.get(`${serverApi}/vehicle/review/${vid}`, {
        headers: headers,
      });
      // console.log(responseNull.data.output);
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const vehicleDetailSlice = createSlice({
  name: "vehicleDetailSlice",
  initialState: initialState,
  reducers: {
    options: (state, action) => {
      state.vehicleDetails = {};
    },
    filteredOptions: (state, action) => {
      state.filteredVehicleList = [];
    },
  },
  extraReducers: {
    [__vehicleDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__vehicleDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.vehicleDetails = action.payload;
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
      // console.log(action.payload);
      state.filteredVehicleList = action.payload;
    },
    [__vehicleSearchList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__vehicleComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__vehicleComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.commentLists = action.payload;
    },
    [__vehicleComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { options, filteredOptions } = vehicleDetailSlice.actions;
export default vehicleDetailSlice.reducer;
