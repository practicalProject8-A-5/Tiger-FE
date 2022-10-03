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
import Button from "./Button";
import { __vehicleSearchList } from "../redux/modules/vehicleDetailSlice";
import pin from "../assets/pin_trans.png";
import clock from "../assets/clock.png";
import vehicle from "../assets/vehicle.png";
import { format } from "date-fns";
import { FaAngleRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    top: "190px",
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
        toast.warn("검색을 완료 해주세요", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
          className: "toatst_warn",
          progressClassName: "warn_progress",
        });
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
        localStorage.setItem("location", location);
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
        localStorage.setItem("type", type);
        localStorage.setItem("locationX", locationX);
        localStorage.setItem("locationY", locationY);

        navigate("/vehicles");
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
          <div className="wrapper_box">
            <StCalendarWrapper style={{ zIndex: 99, position: "relative" }}>
              <img src={clock} alt="시계" />
              <StNewDatePicker
                selected={startDates}
                onChange={(date) => setStartDates(date)}
                selectsStart
                startDate={startDates}
                endDate={endDates}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                shouldCloseOnSelect={true}
                placeholderText="언제부터"
                // customInput={<ExampleCustomInput />}
              />
            </StCalendarWrapper>
            {/* <div className="dateConnection"></div> */}
            <FaAngleRight
              style={{ color: "#CCCCCC", fontSize: 18, marginRight: 27 }}
            />
            <StCalendarWrapper>
              <img src={clock} alt="시계" />
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
            <div className="hour">24시간</div>
          </div>
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
      <StyledContainer />
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
    color: #757575;
    font-weight: 700;
    font-size: 18px;
    outline: none;
    border: none;
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
  }
`;
const StCalendarContainer = styled.div`
  width: 540px;
  display: flex;
  background-color: #f2f2f2;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 12px;
  .wrapper_box {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .hour {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: 98;
      font-weight: 500;
      font-size: 18px;
      color: #8b8b8b;
    }
  }
`;
const StCalendarWrapper = styled.div`
  z-index: 98;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 42px;
  box-sizing: border-box;
  font-size: 14px;
  background: #f2f2f2;
  border-radius: 12px;
  padding: 5px;
  img {
    width: 22px;
    height: 22px;
  }
  .react-datepicker-wrapper {
    margin-left: 8px;
    width: 100%;
    input {
      width: 100%;
      outline: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-weight: 700;
      font-size: 18px;
      color: #8b8b8b;
      background: #f2f2f2;
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
const StNewDatePicker = styled(DatePicker)`
  color: #8b8b8b;
`;
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
    border: none;
    outline: none;
    color: #8b8b8b;
    font-weight: 700;
    font-size: 18px;
    option {
      /* background-color: pink; */
      border-radius: 12px;
    }
  }
`;
const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    position: relative;
  }
  .Toastify__toast-body {
    height: 100px;
    .Toastify__toast-icon > svg {
      fill: #fff;
    }
  }
  .Toastify__progress-bar {
  }
  .Toastify__close-button {
    border-radius: 12px;
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    margin: 0;
  }
`;
export default Search;