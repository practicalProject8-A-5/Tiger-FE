// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import Banner from "../components/home/Banner";
import HomeSearch from "../components/home/HomeSearch";
import styled from "styled-components";
import Section from "../components/home/Section";
import Footer from "../global_elements/Footer";
import topBtn from "../assets/home_image/top_button_icon.png";
import { current } from "@reduxjs/toolkit";
import TopBtn from "../global_elements/TopBtn";

const HomePage = () => {
  const handleScrolling = (e) => {
    // console.log("Height :", e.target.scrollHeight);
    console.log("scrollTop :", e.target.scrollTop);
    // console.log("clientY :", e.currentTarget.clientHeight);
  };

  return (
    <StHomePage onScroll={handleScrolling}>
      <Header />
      <Banner />
      <HomeSearch />
      <Section />
      <TopBtn />
      <Footer />
    </StHomePage>
  );
};

export default HomePage;

const StHomePage = styled.div`
  position: relative;
  /* overflow-y: scroll; */
  /* height: 100vh; */
  /* background-color: pink; */
`;
