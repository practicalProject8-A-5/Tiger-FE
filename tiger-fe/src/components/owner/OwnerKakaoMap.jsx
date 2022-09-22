/*global kakao*/

// eslint-disable-next-line

import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const OwnerKakaoMap = ({ address, locationObj, setLocationObj }) => {
  const mapKey = process.env.REACT_APP_REST_API_KEY;

  const locationOnMap = address;
  // console.log(locationOnMap);
  // console.log(locationObj);

  const getCoords = async (locationOnMap) => {
    const headers = {
      Authorization: `KakaoAK ${mapKey}`,
    };
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${locationOnMap}`,
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

  const createMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // console.log(map);

    // const resultX = locationObj.locationX;
    // const resultY = locationObj.locationY;

    if (locationOnMap) {
      // console.log(locationOnMap);
      var coords = new kakao.maps.LatLng(
        locationObj.locationY,
        locationObj.locationX
      );

      var marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:6px 0;">차량 위치</div>',
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);

      // console.log(coords);

      // const locationX = parseInt(locationObj.locationX);
      // const locationY = parseInt(locationObj.locationY);
      // // 위도경도 값
      // console.log(locationX, locationY);
      // console.log(typeof locationX);
    }
  };

  useEffect(() => {
    if (locationOnMap) getCoords(locationOnMap);
  }, [locationOnMap]);

  // 맵을 생성하는 함수를 처음 렌더링 그리고 locationObj가 변경될 때만 랜더링 하고
  useEffect(() => {
    createMap();
  }, [locationObj]);

  // --------------익현 끝 --------------------------------------
  // return <div></div>;
  return (
    <StOwnerMap>
      <div id="map"></div>
      <div>{locationOnMap}</div>
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
