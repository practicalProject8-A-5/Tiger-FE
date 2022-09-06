// eslint-disable-next-line

import React from "react";
import { Routes, Route } from "react-router-dom";
import RentMainPage from "../pages/RentMainPage";
import OwnerPage from "../pages/OwnerPage";
import RenterPage from "../pages/RenterPage";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import VehicleListPage from "../pages/VehicleListPage";
import HomePage from "../pages/HomePage";
import OwnerFormPage from "../pages/OwnerFormPage";
import OwnerItemList from "../components/owner/OwnerItemList";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<RentMainPage />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/owner/:category" element={<OwnerItemList />} />
      <Route path="/intro" element={<HomePage />} />
      <Route path="/renter" element={<RenterPage />} />
      <Route path="/vdetail/:id" element={<VehicleDetailPage />} />
      <Route path="/ownerregisterform" element={<OwnerFormPage />} />
      <Route path="/vlist" element={<VehicleListPage />} />
    </Routes>
  );
};

export default GlobalRouter;
