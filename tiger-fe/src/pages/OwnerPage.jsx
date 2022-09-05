// eslint-disable-next-line

import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import NavBar from "../components/owner/NavBar";

import GlobalLayout from "../global/GlobalLayout";
import Header from "../global_elements/Header";
import OwnerItemList from "../components/owner/OwnerItemList";
import OwnerInfo from "../components/owner/OwnerInfo";

const OwnerPage = () => {
  const [category, setCategory] = useState("Registration");
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Header />
      <NavBar category={category} onSelect={onSelect} />
      <GlobalLayout>
        <OwnerInfo />
        <OwnerItemList category={category} onSelect={onSelect} />
      </GlobalLayout>
    </>
  );
};

export default OwnerPage;
