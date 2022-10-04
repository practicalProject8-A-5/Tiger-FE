import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import MainItem from "./MainItem";
import { __incomeItemList } from "../../redux/modules/incomeItemListSlice";
import { useDispatch, useSelector } from "react-redux";
import { option } from "../../redux/modules/incomeItemListSlice";

const MainItemList = () => {
  const dispatch = useDispatch();

  const mainItemLists = useSelector(
    (state) => state.incomeItemListSlice.incomeItemList
  );
  // console.log(mainItemLists);

  const target = useRef(null);

  const [newItemLists, setNewItemLists] = useState([]);
  const [page, setPage] = useState(0);

  // console.log(newItemLists);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(__incomeItemList(page));
        setPage(page + 1);
      }
    });
    if (target.current !== null) {
      observer.observe(target.current);
    }
    return () => {
      if (target.current !== null) {
        observer.unobserve(target.current);
      }
      dispatch(option());
    };
  }, [target, newItemLists.length]);

  useEffect(() => {
    setNewItemLists([...newItemLists, ...mainItemLists]);
  }, [mainItemLists]);

  return (
    <StItemList>
      {newItemLists &&
        newItemLists.map((list, i) => <MainItem key={i} list={list} />)}
      <StObserveContainer ref={target} />
    </StItemList>
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
  justify-content: center;
`;

const StObserveContainer = styled.div`
  height: 1px;
`;
