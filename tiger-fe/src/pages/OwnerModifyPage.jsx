import React from "react";
import VehicleRegister from "../components/owner/VehicleRegister";
import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import NavBar from "../components/owner/NavBar";
import PaymentInfo from "../components/owner/PaymentInfo";
import Calender from "../components/owner/Calender";
import TestCalender from "../components/owner/TestCalender";
import VehicleModify from "../components/owner/VehicleModify";

const OwnerModifyPage = () => {
  return (
    <>
      <Header />
      {/* <NavBar /> */}
      <GlobalLayout>
        <VehicleModify />
      </GlobalLayout>
    </>
  );
};

export default OwnerModifyPage;
