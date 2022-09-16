// eslint-disable-next-line

import React, { useCallback, useState } from "react";
import NavBar from "../components/owner/NavBar";
import GlobalLayout from "../global/GlobalLayout";
import Header from "../global_elements/Header";
import OwnerItemList from "../components/owner/OwnerItemList";
import OwnerInfo from "../components/owner/OwnerInfo";
import { useParams } from "react-router-dom";
import CalenderBox from "../components/owner/CalenderBox";

const OwnerPage = () => {
  const [category, setCategory] = useState("Registration");
  const onSelect = useCallback((category) => setCategory(category), []);

  const targetId = useParams();

  return (
    <>
      <Header />
      <NavBar category={category} onSelect={onSelect} />
      <GlobalLayout>
        <OwnerInfo />
        <OwnerItemList category={category} onSelect={onSelect} />
        {/* <CalenderBox /> */}
      </GlobalLayout>
    </>
  );
};

export default OwnerPage;
