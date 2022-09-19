// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import Header from "../global_elements/Header";

const GlobalLayout = ({ children }) => {
  return (
    <GlobalLayoutContainer>
      {/* <Header /> */}
      {children}
    </GlobalLayoutContainer>
  );
};

const GlobalLayoutContainer = styled.div`
  /* background-color: skyblue; */
  padding: 0 246px;
  box-sizing: border-box;
  position: relative;
`;

export default GlobalLayout;
