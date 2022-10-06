// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const memberApi = process.env.REACT_APP_SERVER;

const initialState = {
  ownerRegisterInfo: {},
  isLoading: false,
  success: null,
  error: null,
};

//차량 등록
export const __ownerRegisterInfo = createAsyncThunk(
  "ownerRegister/__ownerRegisterInfo",
  async (payload, thunkAPI) => {
    const {
      vbrand,
      price,
      description,
      location,
      formData,
      vname,
      type,
      years,
      fuelType,
      passengers,
      transmission,
      fuelEfficiency,
    } = payload;
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const headers = {
        Authorization: userToken,
        RefreshToken: refreshToken,
        "Content-Type": "application/json",
      };
      const resp = await axios.post(
        `${memberApi}/vehicle/management`,
        {
          vbrand,
          vname,
          years,
          passengers,
          transmission,
          fuelType,
          price,
          description,
          location,
          formData,
          type,
          fuelEfficiency,
        },

        { headers: headers }
      );
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ownerRegisterInfoSlice = createSlice({
  name: "ownerRegisterInfoSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__ownerRegisterInfo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__ownerRegisterInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ownerRegisterInfo = action.payload;
    },
    [__ownerRegisterInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ownerRegisterInfoSlice.reducer;
