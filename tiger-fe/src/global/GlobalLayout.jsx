// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  return <GlobalLayoutContainer>{children}</GlobalLayoutContainer>;
};

const GlobalLayoutContainer = styled.div`
  /* background-color: yellowgreen; */
  padding: 0 93px 0 93px;
  box-sizing: border-box;
`;

export default GlobalLayout;
