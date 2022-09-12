// eslint-disable-next-line

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RentMainPage from "../pages/RentMainPage";
import OwnerPage from "../pages/OwnerPage";
import RenterPage from "../pages/RenterPage";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import VehicleListPage from "../pages/VehicleListPage";
import HomePage from "../pages/HomePage";
import OwnerFormPage from "../pages/OwnerFormPage";
import OwnerItemList from "../components/owner/OwnerItemList";
import KakaoLogin from "../components/member/KakaoLogin";
// import isLoggedin from "../components/member/isLoggedin";
import { useSelector } from "react-redux";

const GlobalRouter = () => {
  const userInfo = useSelector((state) => state.memberSlice.userInfo);
  console.log(userInfo);
  return (
    <Routes>
      <Route exact path="/" element={<RentMainPage />} />
      {!userInfo.name ? (
        <Route path="/owner" element={<Navigate to="/" />} />
      ) : (
        <Route path="/owner" element={<OwnerPage />} />
      )}
      <Route path="/owner/:category" element={<OwnerItemList />} />
      <Route path="/intro" element={<HomePage />} />
      {!userInfo.name ? (
        <Route path="/renter" element={<Navigate to="/" />} />
      ) : (
        <Route path="/renter" element={<RenterPage />} />
      )}
      <Route path="/renter" element={<RenterPage />} />
      <Route path="/vdetail/:id" element={<VehicleDetailPage />} />
      <Route path="/ownerregisterform" element={<OwnerFormPage />} />
      <Route path="/vlist" element={<VehicleListPage />} />
      <Route path="/user/kakao/callback" element={<KakaoLogin />} />
    </Routes>
  );
};

export default GlobalRouter;
