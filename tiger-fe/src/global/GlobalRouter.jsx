// eslint-disable-next-line

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import OwnerPage from "../pages/OwnerPage";
import RenterPage from "../pages/RenterPage";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import VehicleListPage from "../pages/VehicleListPage";

const GlobalRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/renter" element={<RenterPage />} />
        <Route path="/vdetail/:id" element={<VehicleDetailPage />} />
        <Route path="/vlist" element={<VehicleListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default GlobalRouter;
