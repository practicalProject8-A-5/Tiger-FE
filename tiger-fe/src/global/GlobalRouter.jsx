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
import OwnerModifyPage from "../pages/OwnerModifyPage";
import { useSelector } from "react-redux";
import NotFound from "../global_elements/NotFound";

const GlobalRouter = () => {
  const userInfo = useSelector((state) => state.memberSlice.userInfo);
  // console.log(userInfo);
  return (
    <Routes>
      <Route exact path="/" element={<RentMainPage />} />
      {userInfo.name === null ? (
        <Route path="/owner" element={<Navigate to="/" />} />
      ) : (
        <Route path="/owner" element={<OwnerPage />} />
      )}
      {userInfo.name === null ? (
        <Route path="/owner/:category" element={<Navigate to="/" />} />
      ) : (
        <Route path="/owner/:category" element={<OwnerItemList />} />
      )}
      {userInfo.name === null ? (
        <Route path="/ownerregisterform" element={<Navigate to="/" />} />
      ) : (
        <Route path="/ownerregisterform" element={<OwnerFormPage />} />
      )}
      {userInfo.name === null ? (
        <Route path="/owner/:id/modi" element={<Navigate to="/" />} />
      ) : (
        <Route path="/owner/:id/modi" element={<OwnerModifyPage />} />
      )}
      {userInfo.name === null ? (
        <Route path="/renter" element={<Navigate to="/" />} />
      ) : (
        <Route path="/renter" element={<RenterPage />} />
      )}
      <Route path="/intro" element={<HomePage />} />
      <Route path="/vdetail/:id" element={<VehicleDetailPage />} />
      <Route path="/vlist" element={<VehicleListPage />} />
      <Route path="/user/kakao/callback" element={<KakaoLogin />} />
      <Route
        path="*"
        element={
          <NotFound
            upperText={<div>해당 페이지를 찾지 못했습니다.</div>}
            lowerText={<div>이용에 불편함을 끼쳐드려 죄송합니다.</div>}
          />
        }
      />
    </Routes>
  );
};

export default GlobalRouter;
