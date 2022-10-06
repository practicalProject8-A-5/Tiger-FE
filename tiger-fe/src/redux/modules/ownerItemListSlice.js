// eslint-disable-next-line

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  OwnerItemList: {},
  isLoading: false,
  success: null,
  error: null,
};

//등록 차량
export const __registeredItemList = createAsyncThunk(
  "owner/__registeredItemList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(`${serverApi}/vehicle/management`, {
        headers: headers,
      });
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//예약 주문
export const __reservedItemList = createAsyncThunk(
  "owner/__reservedItemList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner?status=RESERVED&limit=100&offset=0`,
        { headers: headers }
      );
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//진행 주문
export const __useItemList = createAsyncThunk(
  "owner/__useItemList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner?status=USE&limit=100&offset=0`,
        { headers: headers }
      );
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//지난
export const __returnItemList = createAsyncThunk(
  "owner/__returnItemList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner?status=RETURN&limit=100&offset=0`,
        { headers: headers }
      );
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//환불
export const __cancleItemList = createAsyncThunk(
  "owner/__cancleItemList",
  async (payload, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner?status=CANCEL&limit=100&offset=0`,
        { headers: headers }
      );
      return thunkAPI.fulfillWithValue(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//등록 차량
const ownerItemListSlice = createSlice({
  name: "ownerItemListSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //등록
    [__registeredItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__registeredItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.OwnerItemList = action.payload;
    },
    [__registeredItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //예약
    [__reservedItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__reservedItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.OwnerItemList = action.payload;
    },
    [__reservedItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //진행
    [__useItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__useItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.OwnerItemList = action.payload;
    },
    [__useItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //지난
    [__returnItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__returnItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.OwnerItemList = action.payload;
    },
    [__returnItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //취소
    [__cancleItemList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__cancleItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.OwnerItemList = action.payload;
    },
    [__cancleItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ownerItemListSlice.reducer;
