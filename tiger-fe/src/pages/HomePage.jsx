// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import Banner from "../components/home/Banner";
import styled from "styled-components";
import Section from "../components/home/Section";
import Footer from "../global_elements/Footer";
import TopBtn from "../global_elements/TopBtn";

const HomePage = () => {
  const handleScrolling = (e) => {};

  return (
    <StHomePage onScroll={handleScrolling}>
      <Header />
      <Banner />
      <Section />
      <TopBtn />
      <Footer />
    </StHomePage>
  );
};

const StHomePage = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  @media (max-width: 767px) {
    width: 100%;
    margin: auto;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    margin: auto;
  }
`;

export default HomePage;
