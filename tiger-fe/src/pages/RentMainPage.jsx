// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import ItemList from "../components/main/ItemList";

const RentMainPage = () => {
  return (
    <StHomePage>
      <ItemList />
    </StHomePage>
  );
};

export default RentMainPage;

const StHomePage = styled.div`
  height: 300vh;
`;
