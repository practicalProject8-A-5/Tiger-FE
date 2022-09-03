// import axios from "axios";
import React from "react";
// import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import OwnerItem from "./OwnerItem";
import { useDispatch, useSelector } from "react-redux";
import { __ownerItemList } from "../../redux/modules/ownerItemListSlice";

const OwnerItemList = () => {
  const OwnerItemLists = useSelector(
    (state) => state.ownerItemListSlice.OwnerItemList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__ownerItemList());
  }, [dispatch]);

  // console.log(OwnerItemLists);
  console.log(OwnerItemLists.output);

  return (
    <StOwnerItemList>
      {OwnerItemLists.output && OwnerItemLists.output.length === 0 ? (
        <p>등록된 차량이 없습니다.</p>
      ) : (
        OwnerItemLists.output &&
        OwnerItemLists.output.map((list, i) => {
          return <OwnerItem key={i} list={list} />;
        })
      )}
      {/* <OwnerItem />
      <OwnerItem />
      <OwnerItem />
      <OwnerItem /> */}
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
