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
      // formData,
    } = payload;
    console.log(payload);
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const headers = {
        Authorization: userToken,
        RefreshToken: refreshToken,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
      };
      const resp = await axios.post(
        `${memberApi}/vehicle/management`,
        // `/api/vehicle/management`,
        // `/api/vehicle`

        // formData,
        {
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
        },

        { headers: headers }
      );
      // console.log(resp.data);
      console.log(vbrand);
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
      // console.log("pending");
    },
    [__ownerRegisterInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.ownerRegisterInfo = action.payload;
    },
    [__ownerRegisterInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = incomeItemListSlice.actions;
export default ownerRegisterInfoSlice.reducer;
