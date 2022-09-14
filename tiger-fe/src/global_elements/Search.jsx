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

// import DatePicker, {
//   DateObject,
//   getAllDatesInRange,
// } from "react-multi-date-picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";

const Search = () => {
  const mapKey = process.env.REACT_APP_REST_API_KEY;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 추후 서버 열리면 밑에 div 에 정보들을 뿌릴 예정
  // const getVehicleList = useSelector((state) => state.searchSlice.filteredVehicleList);

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

  console.log(location);

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
        console.log(res);
        const location = res.data.documents[0];
        setLocationObj({
          locationX: location.address.x,
          locationY: location.address.y,
        });
      });
  };

  const locationX = Number(locationObj.locationX);
  const locationY = Number(locationObj.locationY);

  console.log(locationX, locationY);

  // 검색한 주소로 위도경도 구하기
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const geocoder = new kakao.maps.services.Geocoder();
  // geocoder.addressSearch(address, function (result, status) {
  //   if (status === kakao.maps.services.Status.OK) {
  //     const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  //     console.log(coords);
  //     setLatitude(coords.Ma);
  //     setLongitude(coords.La);
  //   }
  // });

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
  const [startDates, setStartDates] = useState(new Date());
  const [endDates, setEndDates] = useState(new Date());

  const startDate = new Date(startDates).toISOString().slice(0, 10);
  const endDate = new Date(endDates).toISOString().slice(0, 10);

  console.log(startDate);
  console.log(endDate);

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
  console.log(type);

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

        await dispatch(
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
        // setAddress("");
        // setType("");
        // setLocationObj({});
      }
    } catch (err) {
      console.log(err);
    }

    // setAddress("");
    // setTypeValue("");
    // setLatitude("");
    // setLongitude("");
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
              selected={startDates}
              onChange={(date) => setStartDates(date)}
              selectsStart
              startDate={startDates}
              endDate={endDates}
              locale={ko}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              shouldCloseOnSelect={true}
              placeholder="언제부터"
              customInput={<ExampleCustomInput />}
            />
          </StCalendarWrapper>
          <div className="dateConnection"></div>
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
              placeholder="언제까지"
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
  width: 374px;
  height: 42px;
  box-sizing: border-box;
  font-size: 14px;
  margin: 25px 0 25px 0;
  cursor: pointer;
  background: #f2f2f2;
  border-radius: 12px;
  padding: 5px;
  border: 1px solid;
  .dateConnection {
    height: 42px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 42px;
    top: -7px;
    position: relative;
    z-index: 99;
    margin-right: 16px;
    margin-left: 16px;
  }
`;

const StCalendarWrapper = styled.div`
  z-index: 99;
  position: relative;
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
    text-indent: 34px;
    border: 0px;
  }
`;

const StNewDatePicker = styled(DatePicker)``;

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
