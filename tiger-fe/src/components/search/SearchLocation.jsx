// eslint-disable-next-line

import React, { useState } from "react";

import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";

const SearchLocation = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

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
    console.log(fullAddress);
    setAddress(fullAddress);
    // console.log(data.zonecode);
  };

  const onChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "21.8%",
    width: "400px",
    height: "400px",
    border: "1px solid black",
  };
  return (
    <SearchLocationContainer>
      <input
        className="location_input"
        value={address}
        onClick={() => {
          setIsPopupOpen(!isPopupOpen);
        }}
        onChange={onChangeHandler}
        placeholder="어디서?"></input>

      {isPopupOpen ? (
        <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      ) : null}
    </SearchLocationContainer>
  );
};

const SearchLocationContainer = styled.div`
  margin: 26px;
  .location_input {
    width: 400px;
    height: 35px;
  }
`;

export default SearchLocation;
