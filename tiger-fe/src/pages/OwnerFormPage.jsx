// eslint-disable-next-line

import React from "react";
import VehicleRegister from "../components/owner/VehicleRegister";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";

const OwnerFormPage = () => {
  return (
    <>
      <Header />
      <GlobalLayout>
        <VehicleRegister />
      </GlobalLayout>
    </>
  );
};

export default OwnerFormPage;
