// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import Banner from "../components/home/Banner";
import HomeSearch from "../components/home/HomeSearch";
import styled from "styled-components";
import Section from "../components/home/Section";

const HomePage = () => {
  return (
    <StHomePage>
      <Header />
      <Banner />
      <HomeSearch />
      <Section />
      <div className="top"></div>
    </StHomePage>
  );
};

export default HomePage;

const StHomePage = styled.div`
  position: relative;
`;
