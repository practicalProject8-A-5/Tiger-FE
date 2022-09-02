// eslint-disable-next-line

import React from "react";
import { Routes, Route } from "react-router-dom";
import RentMainPage from "../pages/RentMainPage";
import OwnerPage from "../pages/OwnerPage";
import RenterPage from "../pages/RenterPage";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import VehicleListPage from "../pages/VehicleListPage";
import HomePage from "../pages/HomePage";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RentMainPage />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/intro" element={<HomePage />} />
      <Route path="/renter" element={<RenterPage />} />
      <Route path="/vdetail/:id" element={<VehicleDetailPage />} />
      <Route path="/vlist" element={<VehicleListPage />} />
    </Routes>
  );
};

export default GlobalRouter;
