// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import ItemList from "../components/main/ItemList";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";
import GlobalLayout from "../global/GlobalLayout";

const RentMainPage = () => {
  return (
    <StHomePage>
      <Header />
      <Search />
      <GlobalLayout>
        <ItemList />
      </GlobalLayout>
    </StHomePage>
  );
};

export default RentMainPage;

const StHomePage = styled.div`
  height: 300vh;
`;
