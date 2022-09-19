// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import VehicleModify from "../components/owner/VehicleModify";
import ModifyTest from "../components/owner/ModifyTest";

const OwnerModifyPage = () => {
  return (
    <>
      <Header />
      <GlobalLayout>
        <VehicleModify />
        <ModifyTest />
      </GlobalLayout>
    </>
  );
};

export default OwnerModifyPage;
