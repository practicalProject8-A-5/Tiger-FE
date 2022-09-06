import React, { useEffect } from "react";
import styled from "styled-components";

const OwnerKakaoMap = ({ address }) => {
  console.log(address);
  return (
    <StOwnerMap>
      <div id="map"></div>
    </StOwnerMap>
  );
};

export default OwnerKakaoMap;

const StOwnerMap = styled.div`
  width: 100%;
  height: 286px;
  background-color: #eee;
  #map {
    width: 100%;
    height: 100%;
    background-color: pink;
  }
`;
