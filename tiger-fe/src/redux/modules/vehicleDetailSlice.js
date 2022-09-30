// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER;

const initialState = {
  filteredVehicleList: [],
  vehicleDetails: {},
  commentList: [],
  reviewedComment: {},
  postComment: {},
  isLoading: false,
  error: null,
  status: {},
};

const email = localStorage.getItem("email");
const userToken = localStorage.getItem("userToken");
const refreshToken = localStorage.getItem("refreshToken");

// vehicle detail page
export const __vehicleDetail = createAsyncThunk(
  "detail/__vehicleDetail",
  async (payload, thunkAPI) => {
    const { vId, startDate, endDate } = payload;
    // console.log(vId);
    if (email) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
        };
        if (startDate === null && endDate === null) {
          const responseNull = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=&endDate=`,
            { headers: headers }
          );
          // console.log(responseNull.data.output);
          return thunkAPI.fulfillWithValue(responseNull.data.output);
        } else {
          const response = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=${startDate}&endDate=${endDate}`,
            { headers: headers }
          );
          // console.log(response.data.output);
          return thunkAPI.fulfillWithValue(response.data.output);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        if (startDate === null && endDate === null) {
          const responseNull = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=&endDate=`,
            { headers: headers }
          );
          // console.log(responseNull.data.output);
          return thunkAPI.fulfillWithValue(responseNull.data.output);
        } else {
          const response = await axios.get(
            `${serverApi}/vehicle/${vId}?startDate=${startDate}&endDate=${endDate}`,
            { headers: headers }
          );
          // console.log(response.data.output);
          return thunkAPI.fulfillWithValue(response.data.output);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

// 검색된 차량 리스트 생성
export const __vehicleSearchList = createAsyncThunk(
  "detail/__vehicleSearchList",
  async (payload, thunkAPI) => {
    const { location, startDate, endDate, type, locationX, locationY, page } =
      payload;
    if (email) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: userToken,
          RefreshToken: refreshToken,
        };
        const response = await axios.post(
          `${serverApi}/vehicle/search?page=${page}`,
          {
            location: location,
            locationX: locationX,
            locationY: locationY,
            type: type,
            startDate: startDate,
            endDate: endDate,
          },
          { headers: headers }
        );
        // console.log(response.data.output);
        return thunkAPI.fulfillWithValue(response.data.output);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          `${serverApi}/vehicle/search?page=${page}&size=6`,
          {
            location: location,
            locationX: locationX,
            locationY: locationY,
            type: type,
            startDate: startDate,
            endDate: endDate,
          },
          { headers: headers }
        );
        // console.log(response.data.output);
        return thunkAPI.fulfillWithValue(response.data.output);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

// 리뷰 & 평점 리스트 조회
export const __getVehicleComments = createAsyncThunk(
  "detail/__getVehicleComments",
  async (payload, thunkAPI) => {
    const vid = payload;
    // console.log(vid);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.get(`${serverApi}/vehicle/review/${vid}`, {
        headers: headers,
      });
      // console.log("getComments", response.data.output);
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 올라간 댓글 조회하기
export const __getReviewedComment = createAsyncThunk(
  "detail/__getReviewedComment",
  async (payload, thunkAPI) => {
    const vid = payload;
    // console.log(vid);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.get(`${serverApi}/vehicle/reviewed/${vid}`, {
        headers: headers,
      });
      // console.log("getReviewedComment", response.data.output);
      return thunkAPI.fulfillWithValue(response.data.output);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 & 평점 추가
export const __postVehicleComments = createAsyncThunk(
  "detail/__postVehicleComments",
  async (payload, thunkAPI) => {
    const { comment, rating, vid } = payload;
    // console.log(vid);
    // console.log(comment);
    // console.log(rating);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.post(
        `${serverApi}/vehicle/review/${vid}`,
        {
          comment: comment,
          rating: rating,
        },
        {
          headers: headers,
        }
      );
      // console.log("commentPost :", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 리뷰 & 평정 삭제
export const __deleteComment = createAsyncThunk(
  "detail/__deleteComment",
  async (payload, thunkAPI) => {
    const vid = payload;
    // console.log(vid);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const response = await axios.delete(
        `${serverApi}/vehicle/review/${vid}`,
        {
          headers: headers,
        }
      );
      // console.log("commentPut :", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const vehicleDetailSlice = createSlice({
  name: "vehicleDetailSlice",
  initialState: initialState,
  reducers: {
    options: (state, action) => {
      state.vehicleDetails = {};
    },
    filteredOptions: (state, action) => {
      state.filteredVehicleList = [];
    },
    reviewedOptions: (state, action) => {
      state.reviewedComment = {};
    },
  },
  extraReducers: {
    [__vehicleDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__vehicleDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.vehicleDetails = action.payload;
    },
    [__vehicleDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__vehicleSearchList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__vehicleSearchList.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.filteredVehicleList = action.payload.content;
    },
    [__vehicleSearchList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getVehicleComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getVehicleComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.commentLists = action.payload;
    },
    [__getVehicleComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getReviewedComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getReviewedComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.reviewedComment = action.payload;
    },
    [__getReviewedComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postVehicleComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__postVehicleComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.postComment = action.payload;
    },
    [__postVehicleComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteComment.pending]: (state = initialState, action) => {
      state.isLoading = true;
      state.status = 0;
    },
    [__deleteComment.fulfilled]: (state = initialState, action) => {
      state.isLoading = false;
      state.status = action.payload;
    },
    [__deleteComment.rejected]: (state = initialState, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { options, filteredOptions, reviewedOptions } =
  vehicleDetailSlice.actions;
export default vehicleDetailSlice.reducer;
