// eslint-disable-next-line

import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "../modules/searchSlice";
import vehicleDetailSlice from "../modules/vehicleDetail";
import ownerItemListSlice from "../modules/ownerItemListSlice";
import incomeItemListSlice from "../modules/incomeItemListSlice";
import memberSlice from "../modules/memberSlice";
import ownerRegisterInfoSlice from "../modules/ownerRegister";
import renterItemListSlice from "../modules/renterItemListSlice";
import ownerModiRegisterInfoSlice from "../modules/ownerModify";

const reducer = combineReducers({
  searchSlice,
  ownerItemListSlice,
  vehicleDetailSlice,
  incomeItemListSlice,
  memberSlice,
  ownerRegisterInfoSlice,
  renterItemListSlice,
  ownerModiRegisterInfoSlice,
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
