// eslint-disable-next-line

import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../modules/searchSlice";

const reducer = combineReducers({
  searchSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  devTools: true,
});

export default store;
