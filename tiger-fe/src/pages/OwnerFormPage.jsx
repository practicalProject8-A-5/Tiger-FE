// eslint-disable-next-line

import React from "react";
import VehicleRegister from "../components/owner/VehicleRegister";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import CreateTest from "../components/owner/CreateTest";

const OwnerFormPage = () => {
  return (
    <>
      <Header />
      <GlobalLayout>
        {/* <VehicleRegister /> */}
        <CreateTest />
      </GlobalLayout>
    </>
  );
};

export default OwnerFormPage;
