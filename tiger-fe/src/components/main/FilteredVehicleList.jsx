// eslint-disable-next-line

import React, { useEffect } from "react";
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
  const filteredVehicle = useSelector(
    (state) => state.vehicleDetailSlice.filteredVehicleList
  );
  console.log(filteredVehicle);

  const dispatch = useDispatch();

  useEffect(() => {
    const location = localStorage.getItem("location");
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");
    const type = localStorage.getItem("type");
    const locationX = localStorage.getItem("locationX");
    const locationY = localStorage.getItem("locationY");

    if (
      filteredVehicle.length === 0 &&
      location &&
      startDate &&
      endDate &&
      type &&
      locationX &&
      locationY
    ) {
      console.log("works");
      dispatch(
        __vehicleSearchList({
          location,
          startDate,
          endDate,
          type,
          locationX,
          locationY,
        })
      );
    }
    return () => {
      dispatch(filteredOptions());
    };
  }, [dispatch]);

  return (
    <StItemContainer>
      {filteredVehicle.length === 0 ? (
        <NotFound
          upperText={<div>등록차량을 찾을수 없습니다.</div>}
          lowerText={<div>검색 조건을 변경하여 더 많은 차량을 찾아보세요!</div>}
        />
      ) : (
        <>
          <StItemLeft>
            {filteredVehicle &&
              filteredVehicle.map((list, index) => (
                <FilteredVehicle key={index} list={list} />
              ))}
          </StItemLeft>
          <StItemRight>
            <FilteredMap filteredVehicle={filteredVehicle} />
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

export default FilteredVehicleList;
