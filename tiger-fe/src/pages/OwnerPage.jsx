// eslint-disable-next-line

import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import NavBar from "../components/owner/NavBar";

import GlobalLayout from "../global/GlobalLayout";
import Header from "../global_elements/Header";
import OwnerItemList from "../components/owner/OwnerItemList";
import OwnerInfo from "../components/owner/OwnerInfo";

// import { __registeredItemList } from "../../redux/modules/ownerItemListSlice";
// import { __reservedItemList } from "../../redux/modules/ownerItemListSlice";
// import { __useItemList } from "../../redux/modules/ownerItemListSlice";
// import { __returnItemList } from "../../redux/modules/ownerItemListSlice";
// import { __cancleItemList } from "../../redux/modules/ownerItemListSlice";

const OwnerPage = () => {
  // const [category, setCategory] = useState([
  //   "차량등록",
  //   "예약등록",
  //   "진행등록",
  //   "지난등록",
  // ]);
  const [category, setCategory] = useState("등록차량");
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
