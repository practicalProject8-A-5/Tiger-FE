import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://run.mocky.io/v3/26e54b5f-a7d8-4d8b-a170-dd2cd520d144",
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

//예약 주문
export const __reservedItemList = createAsyncThunk(
  "owner/__reservedItemList",
  async (payload, thunkAPI) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://run.mocky.io/v3/5f220712-9eb7-4a27-8870-c1ccd794306b",
        // `/api/order/owner?status=reserved&limit={limit}&{offset}`
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

//진행 주문
export const __useItemList = createAsyncThunk(
  "owner/__useItemList",
  async (payload, thunkAPI) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://run.mocky.io/v3/1e6388f7-a986-495a-91d1-2494f9a3d1e6",
        // `/api/order/owner?status=use&limit={limit}&{offset}`
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

//지난
export const __returnItemList = createAsyncThunk(
  "owner/__returnItemList",
  async (payload, thunkAPI) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://run.mocky.io/v3/9166c33e-e74b-4bb4-baf8-6cfda2b15fe3",
        // `/api/order/owner?status=return&limit={limit}&{offset}`
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

//환불
export const __cancleItemList = createAsyncThunk(
  "owner/__cancleItemList",
  async (payload, thunkAPI) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const resp = await axios.get(
        "https://run.mocky.io/v3/a511fe1c-9069-4b6b-a874-ec4476bff96d",
        // `/api/order/owner?status=cancle&limit={limit}&{offset}`
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
      // console.log(action.payload);
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
      // console.log(action.payload);
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
      // console.log(action.payload);
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
      // console.log(action.payload);
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
      // console.log(action.payload);
      state.OwnerItemList = action.payload;
    },
    [__cancleItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const {} = ownerItemListSlice.actions;
export default ownerItemListSlice.reducer;
