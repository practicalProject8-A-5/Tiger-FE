// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import FilteredVehicleList from "../components/main/FilteredVehicleList";
import Search from "../global_elements/Search";
import GlobalLayout from "../global/GlobalLayout";

const VehicleListPage = () => {
  return (
    <>
      <Header />
      <Search />
      <GlobalLayout>
        <FilteredVehicleList />
      </GlobalLayout>
    </>
  );
};

export default VehicleListPage;
