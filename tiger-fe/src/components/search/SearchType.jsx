// eslint-disable-next-line

import React, { useState } from "react";
import styled from "styled-components";

const SearchType = () => {
  const getInitialState = () => {
    const value = "자동차 종류";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  console.log(value);
  return (
    <VehicleTypeContainer>
      <select value={value} onChange={handleChange}>
        <option value="자동차 종류" disabled>
          자동차 종류
        </option>
        <option value="경형">경형</option>
        <option value="중형">증형</option>
        <option value="대형">대형</option>
        <option value="승합RV">승합RV</option>
        <option value="수입">수입</option>
      </select>

      {/* {value} */}
    </VehicleTypeContainer>
  );
};

const VehicleTypeContainer = styled.div`
  /* margin: 25px; */
  select {
    width: 300px;
    height: 42px;
    padding: 8px;
    cursor: pointer;
  }
`;

export default SearchType;
