// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
// import Banner from "../components/main/Banner";
// import Category from "../components/main/Categori";
// import Desc from "../components/main/Desc";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";

const HomePage = () => {
  return (
    <StHomePage>
      <Header />
      <Search />
      {/* <Banner />
      <Desc />
      <Category /> */}
    </StHomePage>
  );
};

export default HomePage;

const StHomePage = styled.div`
  height: 300vh;
`;
