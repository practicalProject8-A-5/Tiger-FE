import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const renterMyPage = process.env.REACT_APP_RENTER;

const initialState = {
  renterItemLists: {},
  isLoading: false,
  result: null,
  error: null,
};

export const __getRenterItemList = createAsyncThunk(
  "renter/__getRenterItemList",
  async (payload, thunkAPI) => {
    console.log(payload);
    const status = payload;
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        renterMyPage + `/renter?status=${status}&limit=100&0`,
        {},
        { headers: headers }
      );
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const renterItemListSlice = createSlice({
  name: "renterItemListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getRenterItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getRenterItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.renterItemLists = action.payload;
    },
    [__getRenterItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = renterItemListSlice.actions;
export default renterItemListSlice.reducer;
