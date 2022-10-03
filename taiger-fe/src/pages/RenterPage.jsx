// eslint-disable-next-line

import React, { useState, useCallback } from "react";
import Header from "../global_elements/Header";
import RenterNavbar from "../components/renter/RenterNavbar";
import GlobalLayout from "../global/GlobalLayout";
import RenterInfo from "../components/renter/RenterInfo";
import RenterItem from "../components/renter/RenterItem";
import styled from "styled-components";

const RenterPage = () => {
  const [category, setCategory] = useState("RESERVED");
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Header />
      <RenterNavbar category={category} onSelect={onSelect} />
      <GlobalLayout>
        <StRenterContainer>
          <RenterItem category={category} onSelect={onSelect} />
          <RenterInfo />
        </StRenterContainer>
      </GlobalLayout>
    </>
  );
};

const StRenterContainer = styled.div`
  position: relative;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    margin: 50px auto;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 50px auto;
    background: #fff;
    width: 100%;
  }
`;

export default RenterPage;
