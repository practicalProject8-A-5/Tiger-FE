// eslint-disable-next-line

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { __vehicleSearchList } from "../../redux/modules/vehicleDetail";
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";

const HomeSearch = () => {
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
    top: "80%",
    left: "3%",
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
      <div className="text_box">
        <p>
          어디<span>든지</span>
        </p>
        <p style={{ marginLeft: "123px" }}>
          언제<span>든지</span>
        </p>
        <p>
          어떤 차<span>든지</span>
        </p>
      </div>
      <div className="input_box">
        <input
          className="location_input"
          value={location}
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          onChange={onChangeHandler}
          placeholder="어디서?"
        ></input>
        {isPopupOpen ? (
          <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
          </div>
        ) : (
          !isPopupOpen
        )}
        <StCalendarContainer>
          <StCalendarWrapper style={{ zIndex: 999 }}>
            <StNewDatePicker
              className="StNewDatePicker"
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
              // customInput={<ExampleCustomInput />}
            />
          </StCalendarWrapper>
          <div className="dateConnection">~</div>
          <StCalendarWrapper>
            <StNewDatePicker
              className="StNewDatePicker"
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
              // customInput={<ExampleCustomInput />}
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
      </div>

      <div className="searh_btn" onClick={onSubmitHandler}>
        <FaSearch className="search_i" />
        <p>차량 검색</p>
      </div>
    </StSearch>
  );
};

export default HomeSearch;

const StSearch = styled.div`
  width: 1470px;
  height: 190px;
  background-color: #fff;
  /* background-color: skyblue; */
  box-shadow: 0px 46px 96px rgba(0, 0, 0, 0.08),
    0px 15.375px 26.2996px rgba(0, 0, 0, 0.0521271),
    0px 6.38599px 10.2342px rgba(0, 0, 0, 0.04),
    0px 2.30969px 3.45191px rgba(0, 0, 0, 0.0278729);
  border-radius: 36px;
  position: absolute;
  top: 705px;
  left: 96px;
  .text_box {
    width: 100%;
    /* background-color: yellowgreen; */
    display: flex;
    justify-content: space-around;
    font-weight: 600;
    font-size: 24px;
    color: #4d4d4d;
    margin-top: 34px;
    span {
      color: #ff881b;
    }
  }
  .input_box {
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
    input {
      width: 400px;
      height: 55px;
      outline: none;
      border: none;
      background: #f2f2f2;
      border-radius: 12px;
      text-indent: 20px;
    }
    .date {
      width: 540px;
    }
  }
  .searh_btn {
    width: 240px;
    height: 188px;
    background: #ff881b;
    box-shadow: 0px 46px 96px rgba(0, 0, 0, 0.08),
      0px 15.375px 26.2996px rgba(0, 0, 0, 0.0521271),
      0px 6.38599px 10.2342px rgba(0, 0, 0, 0.04),
      0px 2.30969px 3.45191px rgba(0, 0, 0, 0.0278729);
    border-radius: 36px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: calc(100% + 18px);
    cursor: pointer;
    .search_i {
      font-size: 60px;
      margin-bottom: 31px;
    }
    p {
      font-weight: 700;
      font-size: 26px;
    }
  }
`;

const StCalendarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  height: 55px;
  .dateConnection {
    height: 42px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 42px;
    top: 5px;
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
  align-items: center;
  width: 180px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  background: #f2f2f2;
  border-radius: 12px;
  padding: 5px;
  img {
    width: 21px;
    height: 21px;
  }
  .react-datepicker-wrapper {
    margin-left: 8px;
    width: 100%;
    /* background-color: pink; */
    .react-datepicker__input-container {
      background-color: pink;
      input {
        width: 100%;
        outline: none;
        border: none;
        padding: 0;
        background: #f2f2f2;
        /* background-color: pink; */
      }
    }
  }
  .react-datepicker__tab-loop {
    .react-datepicker-popper {
      /* background-color: pink; */
      position: absolute;
      inset: 0px auto auto 0px;
      transform: translate(641px, 179px);
      div {
        .react-datepicker {
          width: 100%;
          .react-datepicker__month-container {
            width: 400px;
            /* width: 100%; */
            /* background-color: pink; */
            .react-datepicker__header {
              background-color: #fff;
              border: none;
              font-weight: 600;
              font-size: 18px;
              .react-datepicker__current-month {
                /* margin-top: 20px; */
                position: absolute;
                top: 20%;
                left: 50%;
                transform: translateX(-50%);
              }
              .react-datepicker__day-names {
                margin-top: 30px;
                display: flex;
                justify-content: space-between;
                .react-datepicker__day-name {
                  font-weight: 600;
                  font-size: 14px;
                  color: #8b8b8b;
                }
              }
            }
            .react-datepicker__month {
              .react-datepicker__week {
                display: flex;
                justify-content: space-between;
                .react-datepicker__day--weekend {
                  /* color: red; */
                }
                .react-datepicker__day--selected {
                  background-color: #000 !important;
                  border-radius: 50%;
                  color: #fff !important;
                }
                .react-datepicker__day--today {
                  font-weight: 800;
                  border-radius: 50%;
                  background-color: transparent;
                  color: #000;
                  :hover {
                    background-color: #f0f0f0;
                  }
                }
                .react-datepicker__day {
                  :hover {
                    border-radius: 50%;
                  }
                }
                .react-datepicker__day--in-selecting-range {
                  background-color: #000;
                  color: #fff;
                  border-radius: 50%;
                  :hover {
                    border-radius: 50%;
                  }
                }
              }
            }
          }
          .react-datepicker__triangle {
          }
        }
      }
    }
  }
`;
const StNewDatePicker = styled(DatePicker)``;
const StVehicleTypeContainer = styled.div`
  select {
    width: 300px;
    height: 55px;
    padding: 8px;
    cursor: pointer;
    background: #f2f2f2;
    border-radius: 12px;
    padding: 5px;
    text-indent: 34px;
    border: none;
    outline: none;
    color: #8b8b8b;
  }
`;
