// eslint-disable-next-line

import React, { useState } from "react";
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
    top: "50%",
    width: "400px",
    height: "400px",
  };
  return (
    <div>
      <input
        value={address}
        onClick={() => {
          setIsPopupOpen(!isPopupOpen);
        }}
        onChange={onChangeHandler}
        placeholder="어디서?"></input>

      {isPopupOpen ? (
        <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      ) : null}
    </div>
  );
};

export default SearchLocation;
