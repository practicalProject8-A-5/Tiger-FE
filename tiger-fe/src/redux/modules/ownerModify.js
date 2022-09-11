import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ownerRegisterInfo: {},
  isLoading: false,
  success: null,
  error: null,
};

//등록 차량
export const __ownerRegisterInfo = createAsyncThunk(
  "ownerRegister/__ownerRegisterInfo",
  async (payload, thunkAPI) => {
    const {
      brand,
      price,
      description,
      location,
      files,
      vname,
      type,
      years,
      fuelType,
      passengers,
      transmission,
      fuelEfficiency,
    } = payload;
    try {
      // console.log(brand);
      // console.log(price);
      // console.log(description);
      // console.log(location);
      // console.log(files);
      // console.log(vname);
      // console.log(type);
      // console.log(years);
      // console.log(fuelType);
      // console.log(passengers);
      // console.log(transmission);
      // console.log(fuelEfficiency);

      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.put(
        `/api/vehicle/management/{vId}`,
        // `/api/vehicle`
        {},
        { headers: headers }
      );
      // console.log(resp.data);
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
