// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import MainItemList from "../components/main/MainItemList";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";
import GlobalLayout from "../global/GlobalLayout";
import TopBtn from "../global_elements/TopBtn";

const RentMainPage = () => {
  return (
    <StHomePage>
      <Header />
      <Search />
      <GlobalLayout>
        <MainItemList />
        <TopBtn />
      </GlobalLayout>
    </StHomePage>
  );
};

export default RentMainPage;

const StHomePage = styled.div`
  position: relative;
`;
