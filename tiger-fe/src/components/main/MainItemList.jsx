import React from "react";
import styled from "styled-components";
import MainItem from "./MainItem";

const ItemList = () => {
  return (
    <StItemList>
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
      <MainItem />
    </StItemList>
  );
};

export default ItemList;

const StItemList = styled.div`
  width: 100%;
  margin-top: 108px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 59px 46px;
`;
