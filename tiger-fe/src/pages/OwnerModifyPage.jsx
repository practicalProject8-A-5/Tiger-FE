// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import VehicleModify from "../components/owner/VehicleModify";
// import ModiTest from "../components/owner/VehicleModify";

const OwnerModifyPage = () => {
  return (
    <>
      <Header />
      <GlobalLayout>
        <VehicleModify />
        {/* <ModiTest /> */}
      </GlobalLayout>
    </>
  );
};

export default OwnerModifyPage;
