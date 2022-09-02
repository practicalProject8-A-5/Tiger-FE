import React from "react";
import styled from "styled-components";
import OwnerItem from "./OwnerItem";

const OwnerItemList = () => {
  return (
    <StOwnerItemList>
      <OwnerItem />
      <OwnerItem />
      <OwnerItem />
      <OwnerItem />
    </StOwnerItemList>
  );
};

export default OwnerItemList;
const StOwnerItemList = styled.div`
  width: 790px;
  height: 890px;
  /* background-color: pink; */
  /* border: 1px solid; */
  /* box-sizing: border-box; */
  margin-top: 65px;
`;
