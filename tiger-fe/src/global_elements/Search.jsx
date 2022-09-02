// eslint-disable-next-line

import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

import Button from "./Button";

import { __vehicleSearchList } from "../redux/modules/searchSlice";

const Search = () => {
  const dispatch = useDispatch();

  // 추후 서버 열리면 밑에 div 에 정보들을 뿌릴 예정
  // const getVehicleList = useSelector((state) => state.searchSlice.filteredVehicleList);

  // search full address
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");
  // search reservation dates
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //search vehicle type
  const [value, setValue] = useState();

  // search address
  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    // console.log(data);
    setAddress(fullAddress);
    console.log(address);
    // console.log(data.zonecode);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "21.8%",
    width: "400px",
    height: "400px",
    border: "1px solid black",
    zIndex: "1",
  };

  // date picker button custom
  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {value}
  //   </button>
  // ));

  const newStartDate = new Date(startDate).toISOString().slice(0, 10);
  const newEndDate = new Date(endDate).toISOString().slice(0, 10);

  console.log(newStartDate);
  console.log(newEndDate);

  // modal open or close
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  // search vehicle type
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(value);

  // submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__vehicleSearchList({ address, newStartDate, newEndDate, value }));
    setAddress("");
    setValue("");
  };

  return (
    <StSearch>
      <div className="wrap">
        <StSearchLocationContainer>
          <input
            className="location_input"
            value={address}
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
            onChange={onChangeHandler}
            placeholder="어디서?"></input>

          {isPopupOpen ? (
            <div>
              <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            </div>
          ) : (
            !isPopupOpen
          )}
        </StSearchLocationContainer>

        <StCalendarContainer>
          <StCalendarWrapper>
            <StNewDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              // customInput={<ExampleCustomInput />}
              shouldCloseOnSelect={true}
            />
          </StCalendarWrapper>
          <StCalendarWrapper>
            <StNewDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              // customInput={<ExampleCustomInput />}
              shouldCloseOnSelect={true}
            />
            {/* <button onClick={showModal}>찾기</button> */}

            {/* modal open to payment modal */}
            {/* {isModalOpen ? (
          <Modal showModal={showModal}>
            <p>{String(startDate.toISOString().slice(0, 10))}</p>
            <p>{String(endDate.toISOString().slice(0, 10))}</p>
          </Modal>
        ) : null} */}
          </StCalendarWrapper>
        </StCalendarContainer>

        <StVehicleTypeContainer>
          <select value={value} onChange={handleChange}>
            <option defaultValue="" hidden>
              자동차 종류
            </option>
            <option value="경형">경형</option>
            <option value="중형">중형</option>
            <option value="대형">대형</option>
            <option value="승합RV">승합RV</option>
            <option value="수입">수입</option>
          </select>
        </StVehicleTypeContainer>
        <Button onClick={onSubmitHandler}>찾기</Button>
      </div>
    </StSearch>
  );
};

const StSearch = styled.div`
  width: 100%;
  height: 93px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06),
    0px 10px 12px rgba(0, 0, 0, 0.0456112),
    0px 12.5216px 10px rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: space-between;
  padding: 0 246px;
  box-sizing: border-box;
  /* background-color: skyblue; */
  .wrap {
    width: 1411px;
    /* background-color: pink; */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StSearchLocationContainer = styled.div`
  /* margin: 26px; */
  .location_input {
    width: 400px;
    height: 35px;
    cursor: pointer;
  }
`;

const StCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StCalendarWrapper = styled.div``;

const StNewDatePicker = styled(DatePicker)`
  width: 270px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid orange;
  font-size: 12px;
  margin: 25px 0 25px 0;
  cursor: pointer;
`;

const StVehicleTypeContainer = styled.div`
  /* margin: 25px; */
  select {
    width: 300px;
    height: 42px;
    padding: 8px;
    cursor: pointer;
  }
`;

export default Search;
