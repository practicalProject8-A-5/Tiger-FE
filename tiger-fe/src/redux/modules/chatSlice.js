// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const chatApi = process.env.REACT_APP_CHAT;

const initialState = {
  roomList: [],
  messageList: [],
  notification: false,
  isLoading: false,
  error: null,
};

// 채팅 페이지에서 채팅 리스트 데이터 받아오기
export const getRoomListDB = createAsyncThunk(
  "chat/getRoomListDB",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${chatApi}/chat/rooms`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userToken"),
          RefreshToken: localStorage.getItem("refreshToken"),
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 채팅방에서 채팅 내역 받아오기
export const getMessageListDB = createAsyncThunk(
  "chat/getMessageListDB",
  async (payload, thunkAPI) => {
    const roomId = payload;
    try {
      const response = await axios.get(`${chatApi}/chat/room/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userToken"),
          RefreshToken: localStorage.getItem("refreshToken"),
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: initialState,
  reducers: {
    // 채팅 메시지 추가
    addMessage: (state, { payload }) => {
      state.messageList.push(payload);
    },
    // 채팅 리스트의 메시지 갱신
    updateRoomMessage: (state, { payload }) => {
      if (state.roomList[payload.index] !== undefined) {
        state.roomList[payload.index].message = payload.message;
        state.roomList[payload.index].date = payload.date;
      }
    },
    // 메시지 지우기
    cleanUpMessage: (state, { payload }) => {
      state.messageList = [];
    },
    cleanUpRoomList: (state, { payload }) => {
      state.roomList = [];
    },
    // 알림 표시
    setNotification: (state, { payload }) => {
      state.notification = payload;
    },
    // 알림 개수 초기화
    readMessage: (state, { payload }) => {
      if (state.roomList[payload]?.unreadCnt) {
        state.roomList[payload].unreadCnt = 0;
      }
    },
  },
  extraReducers: {
    // 채팅방 목록
    [getRoomListDB.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getRoomListDB.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.roomList = payload;
    },
    [getRoomListDB.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 채팅 메시지 내역
    [getMessageListDB.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMessageListDB.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.messageList = payload;
    },
    [getMessageListDB.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addMessage,
  updateRoomMessage,
  cleanUpMessage,
  setNotification,
  readMessage,
  cleanUpRoomList,
} = chatSlice.actions;

export default chatSlice.reducer;
