// eslint-disable-next-line

import React, { useCallback, useState } from "react";
import NavBar from "../components/owner/NavBar";
import GlobalLayout from "../global/GlobalLayout";
import Header from "../global_elements/Header";
import OwnerItemList from "../components/owner/OwnerItemList";
import OwnerInfo from "../components/owner/OwnerInfo";
import styled from "styled-components";

const OwnerPage = () => {
  const [category, setCategory] = useState("Registration");
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Header />
      <NavBar category={category} onSelect={onSelect} />
      <GlobalLayout>
        <Stowner>
          <OwnerItemList category={category} onSelect={onSelect} />
          {category !== "Profit" && category !== "Calculate" && <OwnerInfo />}
        </Stowner>
      </GlobalLayout>
    </>
  );
};

const Stowner = styled.div`
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

export default OwnerPage;
