// eslint-disable-next-line

import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import MapSlice from "../modules/MapSlice";

const reducer = combineReducers({
  MapSlice,
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
