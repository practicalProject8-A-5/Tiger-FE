// eslint-disable-next-line

import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import NavBar from "../components/owner/NavBar";
import VehicleRegister from "../components/owner/VehicleRegister";
import GlobalLayout from "../global/GlobalLayout";
import Header from "../global_elements/Header";
import OwnerItemList from "../components/owner/OwnerItemList";
import OwnerInfo from "../components/owner/OwnerInfo";

const OwnerPage = () => {
  const [category, setCategory] = useState("등록 차량");
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Header />
      <NavBar catetory={category} onSelect={onSelect} />
      <GlobalLayout>
        {/* <VehicleRegister /> */}
        <OwnerInfo />
        <OwnerItemList />
      </GlobalLayout>
    </>
  );
};

export default OwnerPage;
