// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import ItemList from "../components/main/ItemList";
// import Header from "../global_elements/Header";
// import Search from "../global_elements/Search";

const RentMainPage = () => {
  return (
    <StHomePage>
      {/* <Header />
      <Search /> */}
      <ItemList />
    </StHomePage>
  );
};

export default RentMainPage;

const StHomePage = styled.div`
  height: 300vh;
`;
