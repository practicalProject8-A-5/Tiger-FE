import React from "react";
import VehicleRegister from "../components/owner/VehicleRegister";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import NavBar from "../components/owner/NavBar";

const OwnerFormPage = () => {
  return (
    <>
      <Header />
      <NavBar />
      <GlobalLayout>
        <VehicleRegister />
      </GlobalLayout>
    </>
  );
};

export default OwnerFormPage;
