// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  return <GlobalLayoutContainer>{children}</GlobalLayoutContainer>;
};

const GlobalLayoutContainer = styled.div`
  /* background-color: skyblue; */
  padding: 0 84px 0 84px;
  box-sizing: border-box;
`;

export default GlobalLayout;
