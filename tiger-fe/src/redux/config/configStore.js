// eslint-disable-next-line

import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../modules/searchSlice";
import ownerItemListSlice from "../modules/ownerItemListSlice";

const reducer = combineReducers({
  searchSlice,
  ownerItemListSlice,
});

const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(logger),
  // devTools: true,
});

export default store;
