// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  renterItemLists: {},
  isLoading: false,
  result: null,
  error: null,
  status: 0,
};

export const __getRenterItemList = createAsyncThunk(
  "renter/__getRenterItemList",
  async (payload, thunkAPI) => {
    console.log(payload);
    const status = payload;
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.get(
        serverApi + `/order/renter?status=${status}&limit=100&offset=0`,
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

// export const __deleteRenterItem = createAsyncThunk(
//   "renter/__deleteRenterItem",
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     const orderId = payload;
//     const userToken = localStorage.getItem("userToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     try {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: userToken,
//         RefreshToken: refreshToken,
//       };
//       const response = await axios.delete(serverApi + `/order/${orderId}`, {
//         headers: headers,
//       });
//       console.log(response);
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

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
    // [__deleteRenterItem.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [__deleteRenterItem.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   console.log(action.payload);
    //   state.status = action.payload;
    // },
    // [__deleteRenterItem.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

// export const {} = renterItemListSlice.actions;
export default renterItemListSlice.reducer;
