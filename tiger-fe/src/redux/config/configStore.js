// eslint-disable-next-line

// import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import vehicleDetailSlice from "../modules/vehicleDetail";
import ownerItemListSlice from "../modules/ownerItemListSlice";
import incomeItemListSlice from "../modules/incomeItemListSlice";
import memberSlice from "../modules/memberSlice";
import ownerRegisterInfoSlice from "../modules/ownerRegister";
import renterItemListSlice from "../modules/renterItemListSlice";
import ownerModiRegisterInfoSlice from "../modules/ownerModify";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import getDateListSlice from "../modules/dateSlice";
import likeSlice from "../modules/likeSlice";

const reducer = combineReducers({
  ownerItemListSlice,
  vehicleDetailSlice,
  incomeItemListSlice,
  memberSlice,
  ownerRegisterInfoSlice,
  renterItemListSlice,
  ownerModiRegisterInfoSlice,
  getDateListSlice,
  likeSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  // devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
// export default store;
