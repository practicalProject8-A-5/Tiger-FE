// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  ownerModiRegisterInfo: {
    vbrand: "",
    vId: "",
    description: "",
    email: "",
    fuelEfficiency: "",
    fuelType: "",
    location: "",
    oname: "",
    passengers: "",
    price: "",
    profileImage: "",
    tel: "",
    transmission: "",
    type: "",
    vname: "",
    years: "",
    imageList: [],
  },
  isLoading: false,
  success: null,
  error: null,
};

//등록 차량정보
export const __ownerModiRegisterInfo = createAsyncThunk(
  "ownerRegister/__ownerModiRegisterInfo",
  async (payload, thunkAPI) => {
    const vId = payload;
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(`${serverApi}/vehicle/management/${vId}`, {
        headers: headers,
      });
      // console.log(resp.data);
      return thunkAPI.fulfillWithValue(resp.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ownerModiRegisterInfoSlice = createSlice({
  name: "ownerModiRegisterInfoSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__ownerModiRegisterInfo.pending]: (state, action) => {
      state.isLoading = true;
      // console.log("pending");
    },
    [__ownerModiRegisterInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.ownerModiRegisterInfo = action.payload;
    },
    [__ownerModiRegisterInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = ownerModiRegisterInfoSlice .actions;
export default ownerModiRegisterInfoSlice.reducer;
