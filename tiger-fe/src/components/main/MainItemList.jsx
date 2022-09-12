import React from "react";
import styled from "styled-components";
import MainItem from "./MainItem";
import { __incomeItemList } from "../../redux/modules/incomeItemListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const MainItemList = () => {
  const MainItemLists = useSelector(
    (state) => state.incomeItemListSlice.incomeItemList
  );

  // console.log(MainItemLists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__incomeItemList());
    // console.log("11");
  }, [dispatch]);
  return (
    <StItemList>
      {MainItemLists.output &&
        MainItemLists.output.map((list, i) => <MainItem key={i} list={list} />)}
    </StItemList>
    // <h1>차량</h1>
  );
};

export default MainItemList;

const StItemList = styled.div`
  width: 100%;
  margin-top: 108px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 59px 46px;
`;
