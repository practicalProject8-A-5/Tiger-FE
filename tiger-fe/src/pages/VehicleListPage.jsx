// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import FilteredVehicleList from "../components/main/FilteredVehicleList";
import Search from "../global_elements/Search";

const VehicleListPage = () => {
  // console.log("vehicleListPage");
  return (
    <>
      <Header />
      <Search />
      <FilteredVehicleList />
    </>
  );
};

export default VehicleListPage;
