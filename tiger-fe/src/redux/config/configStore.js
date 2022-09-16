// eslint-disable-next-line

import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import vehicleDetailSlice from "../modules/vehicleDetail";
import ownerItemListSlice from "../modules/ownerItemListSlice";
import incomeItemListSlice from "../modules/incomeItemListSlice";
import memberSlice from "../modules/memberSlice";
import ownerRegisterInfoSlice from "../modules/ownerRegister";
import renterItemListSlice from "../modules/renterItemListSlice";
import ownerModiRegisterInfoSlice from "../modules/ownerModify";
import getDateListSlice from "../modules/DateSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const reducer = combineReducers({
  ownerItemListSlice,
  vehicleDetailSlice,
  incomeItemListSlice,
  memberSlice,
  ownerRegisterInfoSlice,
  renterItemListSlice,
  ownerModiRegisterInfoSlice,
  getDateListSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  // reducer,
  reducer: persistedReducer,
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
  // devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
// export default store;
