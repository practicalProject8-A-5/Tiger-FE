// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  return <GlobalLayoutContainer>{children}</GlobalLayoutContainer>;
};

const GlobalLayoutContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  max-width: 74.5%;
  @media (max-width: 767px) {
    max-width: 90%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 90%;
  }
`;

export default GlobalLayout;
