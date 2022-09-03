import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  OwnerItemList: {},
  isLoading: false,
  success: null,
  error: null,
};

export const __ownerItemList = createAsyncThunk(
  "owner/__OwnerItemList",
  async (payload, thunkAPI) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://run.mocky.io/v3/5e56afd8-56bd-4480-a292-11fbedc15c0d",
        // `/api/vehicle/management/{ownerId}`
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

const ownerItemListSlice = createSlice({
  name: "ownerItemListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__ownerItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__ownerItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.OwnerItemList = action.payload;
    },
    [__ownerItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = ownerItemListSlice.actions;
export default ownerItemListSlice.reducer;
