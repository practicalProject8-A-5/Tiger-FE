// eslint-disable-next-line

import React, { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Button from "./Button";
import { __vehicleSearchList } from "../redux/modules/vehicleDetail";

import pin from "../assets/pin_trans.png";
import clock from "../assets/clock.png";
import vehicle from "../assets/vehicle.png";
import { format } from "date-fns";

const Search = () => {
  const mapKey = process.env.REACT_APP_REST_API_KEY;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // search full address
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [location, setLocation] = useState("");

  // search address
  const onChangeHandler = (e) => {
    setLocation(e.target.value);
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
    setLocation(fullAddress);
    getCoords(fullAddress);
  };

  // console.log(location);

  const [locationObj, setLocationObj] = useState({});

  const getCoords = (location) => {
    const headers = {
      Authorization: `KakaoAK ${mapKey}`,
    };
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${location}`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        // console.log(res);
        const location = res.data.documents[0];
        setLocationObj({
          locationX: location.address.x,
          locationY: location.address.y,
        });
      });
  };

  const locationX = Number(locationObj.locationX);
  const locationY = Number(locationObj.locationY);

  // console.log(locationX, locationY);

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
  const [startDates, setStartDates] = useState(null);
  const [endDates, setEndDates] = useState(null);

  const startDate = format(new Date(startDates), "yyyy-MM-dd");
  const endDate = format(new Date(endDates), "yyyy-MM-dd");

  // console.log(startDate);
  // console.log(endDate);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      // value={value}
      onClick={onClick}
      ref={ref}>
      {value}
    </button>
  ));

  //search vehicle type
  const [type, setType] = useState();
  const handleChange = (e) => {
    setType(e.target.value);
  };
  // console.log(type);

  // submit handler
  const onSubmitHandler = async (e) => {
    try {
      if (
        startDates === "" ||
        endDates === "" ||
        location === "" ||
        type === ""
      ) {
        alert("검색을 완료 해주세요");
      } else {
        e.preventDefault();
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
        navigate("/vlist");
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <StSearch>
      <div className="wrap">
        <StSearchLocationContainer>
          <input
            className="location_input"
            value={location}
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
              selected={startDates}
              onChange={(date) => setStartDates(date)}
              selectsStart
              startDate={startDates}
              endDate={endDates}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              shouldCloseOnSelect={true}
              placeholderText="언제부터"
              customInput={<ExampleCustomInput />}
            />
          </StCalendarWrapper>
          <div className="dateConnection">~</div>
          <StCalendarWrapper>
            <StNewDatePicker
              selected={endDates}
              onChange={(date) => setEndDates(date)}
              selectsEnd
              startDate={startDates}
              endDate={endDates}
              minDate={startDates}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect={true}
              placeholderText="언제까지"
              customInput={<ExampleCustomInput />}
            />
          </StCalendarWrapper>
        </StCalendarContainer>
        <StVehicleTypeContainer>
          <select value={type} onChange={handleChange}>
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
  justify-content: space-evenly;
  .wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StSearchLocationContainer = styled.div`
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
  justify-content: space-around;
  align-content: space-around;
  .dateConnection {
    height: 42px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 42px;
    top: 25px;
    position: relative;
    z-index: 99;
    margin-right: 16px;
    margin-left: 16px;
  }
`;

const StCalendarWrapper = styled.div`
  z-index: 99;
  display: flex;
  justify-content: center;
  width: 180px;
  height: 42px;
  box-sizing: border-box;
  font-size: 14px;
  margin: 25px 0 25px 0;
  cursor: pointer;
  background: #f2f2f2;
  border-radius: 12px;
  padding: 5px;
  border: 1px solid;
  .example-custom-input {
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer;
    background: #f2f2f2;
    padding: 7px;
    background-image: url(${clock});
    background-repeat: no-repeat;
    background-size: 22px;
    background-position: 1px 4px;
    text-indent: 0px;
    border: 0px;
    width: 100%;
    height: 30px;
  }
`;

const StNewDatePicker = styled(DatePicker)``;

const StVehicleTypeContainer = styled.div`
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
