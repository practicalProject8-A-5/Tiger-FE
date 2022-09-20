// eslint-disable-next-line

import React, { useState } from "react";
import styled from "styled-components";
import MainItemList from "../components/main/MainItemList";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";
import GlobalLayout from "../global/GlobalLayout";

const RentMainPage = () => {
  // const [inOwner, setInOwner] = useState(false);
  // console.log("inOwner==>", inOwner);
  return (
    <StHomePage>
      {/* <Header inOwner={inOwner} setInOwner={setInOwner} /> */}
      <Header />
      <Search />
      <GlobalLayout>
        <MainItemList />
      </GlobalLayout>
    </StHomePage>
  );
};

export default RentMainPage;

const StHomePage = styled.div`
  height: 300vh;
`;
