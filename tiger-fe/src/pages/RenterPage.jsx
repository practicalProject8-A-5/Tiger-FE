// eslint-disable-next-line

import React, { useState, useCallback } from "react";

import Header from "../global_elements/Header";
import RenterNavbar from "../components/renter/RenterNavbar";
import GlobalLayout from "../global/GlobalLayout";
import RenterInfo from "../components/renter/RenterInfo";
import RenterItem from "../components/renter/RenterItem";

const RenterPage = () => {
  const [category, setCategory] = useState("RESERVED");
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Header />
      <RenterNavbar category={category} onSelect={onSelect} />
      <GlobalLayout>
        <RenterInfo />
        <RenterItem category={category} onSelect={onSelect} />
      </GlobalLayout>
    </>
  );
};

export default RenterPage;
