// eslint-disable-next-line

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NotFound from "../../global_elements/NotFound";
import FilteredVehicle from "../main/FliteredVehicle";
import FilteredMap from "./FilteredMap";
import {
  __vehicleSearchList,
  filteredOptions,
} from "../../redux/modules/vehicleDetailSlice";

const FilteredVehicleList = () => {
  const dispatch = useDispatch();
  const location = localStorage.getItem("location");
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");
  const type = localStorage.getItem("type");
  const locationX = localStorage.getItem("locationX");
  const locationY = localStorage.getItem("locationY");

  const filteredVehicle = useSelector(
    (state) => state.vehicleDetailSlice.filteredVehicleList
  );

  const target = useRef(null);

  const [newItemLists, setNewItemLists] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (
      filteredVehicle.length === 0 &&
      location &&
      startDate &&
      endDate &&
      type &&
      locationX &&
      locationY
    ) {
      dispatch(
        __vehicleSearchList({
          location,
          startDate,
          endDate,
          type,
          locationX,
          locationY,
          page,
        })
      );
      setPage(page + 1);
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // console.log("____!");
        dispatch(
          __vehicleSearchList({
            location,
            startDate,
            endDate,
            type,
            locationX,
            locationY,
            page,
          })
        );
        // console.log("____!");
        setPage(page + 1);
      }
    });
    if (target.current !== null) {
      // console.log(target.current);
      observer.observe(target.current);
    }
    return () => {
      if (target.current !== null) {
        observer.unobserve(target.current);
      }
      dispatch(filteredOptions());
    };
  }, [target, newItemLists.length]);

  const vidData = newItemLists.filter(
    (arr, index, callback) =>
      index === callback.findIndex((el) => el.vid === arr.vid)
  );

  useEffect(() => {
    setNewItemLists([...newItemLists, ...filteredVehicle]);
    // console.log("setNewItemLists");
  }, [filteredVehicle]);

  return (
    <StItemContainer>
      {vidData.length === 0 ? (
        <NotFound
          upperText={<div>등록차량을 찾을수 없습니다.</div>}
          lowerText={<div>검색 조건을 변경하여 더 많은 차량을 찾아보세요!</div>}
        />
      ) : (
        <>
          <StItemLeft>
            {vidData &&
              vidData.map((list, index) => (
                <FilteredVehicle key={index} list={list} />
              ))}
            <StObserveContainer ref={target} />
          </StItemLeft>

          <StItemRight>
            <FilteredMap filteredVehicle={vidData} />
          </StItemRight>
        </>
      )}
    </StItemContainer>
  );
};

const StItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const StItemLeft = styled.div`
  width: 65rem;
  margin-top: 78px;
  display: flex;
  /* align-items: center; */
  flex-wrap: wrap;
  gap: 0px 40px;
  overflow: auto;
  height: 100vh;
`;

const StItemRight = styled.div`
  margin-top: 78px;
  display: flex;
  align-items: center;
`;

const StObserveContainer = styled.div`
  width: 1px;
  height: 1px;
  position: relative;
`;

export default FilteredVehicleList;
