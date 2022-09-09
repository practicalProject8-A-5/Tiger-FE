// eslint-disable-next-line

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Button from "./Button";
import { __vehicleSearchList } from "../redux/modules/searchSlice";

import pin from "../assets/pin_trans.png";
import clock from "../assets/clock.png";
import vehicle from "../assets/vehicle.png";

// import DatePicker, {
//   DateObject,
//   getAllDatesInRange,
// } from "react-multi-date-picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";

const Search = () => {
  const dispatch = useDispatch();

  // 추후 서버 열리면 밑에 div 에 정보들을 뿌릴 예정
  // const getVehicleList = useSelector((state) => state.searchSlice.filteredVehicleList);

  // search full address
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

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
    top: "18.8%",
    width: "400px",
    height: "400px",
    border: "1px solid black",
    zIndex: "99",
  };

  // search reservation dates
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const newStartDate = new Date(startDate).toISOString().slice(0, 10);
  const newEndDate = new Date(endDate).toISOString().slice(0, 10);

  console.log(newStartDate);
  console.log(newEndDate);

  //search vehicle type
  const [typeValue, setTypeValue] = useState();
  const handleChange = (e) => {
    setTypeValue(e.target.value);
  };
  // console.log(value);

  // submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      __vehicleSearchList({ address, newStartDate, newEndDate, typeValue })
    );
    setAddress("");
    setTypeValue("");
  };

  // ----------------------------------------------------------------

  // const today = new Date();
  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);

  // const [dates, setDates] = useState([]);
  // const [allDates, setAllDates] = useState([]);

  // const dateLists = allDates.map((date, index) => {
  //   return date.format();
  // });
  // console.log(dateLists);

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(__vehicleSearchList({ address, typeValue, dateLists }));
  //   setAddress("");
  //   setTypeValue("");
  // };

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

        {/* <StCalendarContainer>
          <StCalendarWrapper>
            <StNewDatePicker
              range
              value={dates}
              onChange={(dateObjects) => {
                setDates(dateObjects);
                setAllDates(getAllDatesInRange(dateObjects));
              }}
              plugins={[<DatePanel eachDaysInRange />]}
              format="YYYY-MM-DD"
              minDate={new Date()}
            />
          </StCalendarWrapper>
        </StCalendarContainer> */}

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
              shouldCloseOnSelect={true}
              placeholder="언제부터"
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
              shouldCloseOnSelect={true}
              placeholder="언제까지"
            />
          </StCalendarWrapper>
        </StCalendarContainer>

        <StVehicleTypeContainer>
          <select value={typeValue} onChange={handleChange}>
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
  padding: 0 246px;
  box-sizing: border-box;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06),
    0px 10px 12px rgba(0, 0, 0, 0.0456112),
    0px 12.5216px 10px rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: space-between;
  /* background-color: skyblue; */
  .wrap {
    width: 100%;
    /* background-color: pink; */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StSearchLocationContainer = styled.div`
  /* margin: 26px; */
  .location_input {
    width: 350px;
    height: 28px;
    cursor: pointer;
    background: #f2f2f2;
    border-radius: 12px;
    padding: 5px;
    background-image: url(${pin});
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: 9px 7px;
    text-indent: 30px;
    border: 1px solid;
  }
`;

const StCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StCalendarWrapper = styled.div`
  z-index: 99;
`;

const StNewDatePicker = styled(DatePicker)`
  width: 250px;
  height: 42px;
  box-sizing: border-box;
  font-size: 14px;
  margin: 25px 0 25px 0;
  cursor: pointer;
  background: #f2f2f2;
  border-radius: 12px;
  padding: 5px;
  background-image: url(${clock});
  background-repeat: no-repeat;
  background-size: 23px;
  background-position: 9px 8px;
  text-indent: 34px;
  border: 1px solid;
`;

const StVehicleTypeContainer = styled.div`
  /* margin: 25px; */
  select {
    width: 300px;
    height: 42px;
    padding: 8px;
    cursor: pointer;
    background: #f2f2f2;
    border-radius: 12px;
    padding: 5px;
    background-image: url(${vehicle});
    background-repeat: no-repeat;
    background-size: 23px;
    background-position: 9px 7px;
    text-indent: 34px;
  }
`;

export default Search;
