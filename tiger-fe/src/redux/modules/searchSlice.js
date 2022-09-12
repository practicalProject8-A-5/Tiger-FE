// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const mapKey = process.env.REACT_APP_KAKAO_MAP_RESTAPI;

const initialState = {
  filteredVehicleList: {},
  isLoading: false,
  success: null,
  error: null,
  // kakaoCoords: [],
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
      console.log(address);
      console.log(newStartDate);
      console.log(newEndDate);
      console.log(typeValue);
      console.log(locationX);
      console.log(locationY);
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

// export const __kakaoCoords = createAsyncThunk(
//   "search/__kakaoCoords",
//   async (payload, thunkAPI) => {
//     const vehicleDetailsLocation = payload;
//     try {
//       const headers = {
//         Authorization: `KakaoAK ${mapKey}`,
//       };
//       const response = await axios.get(
//         `https://dapi.kakao.com/v2/local/search/address.json?query=${vehicleDetailsLocation}`,
//         { headers: headers }
//       );
//       console.log(response.data);
//       return thunkAPI.fulfillWithValue(response.data.documents);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
    // [__kakaoCoords.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [__kakaoCoords.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.kakaoCoords = action.payload;
    //   // console.log(action.payload);
    // },
    // [__kakaoCoords.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

// export const {} = searchSlice.actions;
export default searchSlice.reducer;
