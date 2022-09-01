import React from "react";
import styled from "styled-components";
import Item from "./Item";

const ItemList = () => {
  return (
    <StItemList>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
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
  gap: 59px 36px;
`;
