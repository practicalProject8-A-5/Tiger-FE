/*global kakao*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const OwnerKakaoMap = ({ address }) => {
  const mapKey = process.env.REACT_APP_REST_API_KEY;

  // console.log(isEditLocation);
  // console.log(address);
  // console.log(locationInfo);

  const locationOnMap = address;

  // useEffect(() => {
  //   const mapContainer = document.getElementById("map");
  //   const mapOption = {
  //     center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
  //     level: 3,
  //   };
  //   // 지도를 생성합니다
  //   var map = new kakao.maps.Map(mapContainer, mapOption);

  //   // 주소-좌표 변환 객체를 생성합니다
  //   var geocoder = new kakao.maps.services.Geocoder();

  //   // 주소로 좌표를 검색합니다
  //   // 이거 채운이가 필요
  //   geocoder.addressSearch(locationOnMap, function (result, status) {
  //     // 정상적으로 검색이 완료됐으면
  //     if (status === kakao.maps.services.Status.OK) {
  //       var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

  //       // 결과값으로 받은 위치를 마커로 표시합니다
  //       var marker = new kakao.maps.Marker({
  //         map: map,
  //         position: coords,
  //       });

  //       // 인포윈도우로 장소에 대한 설명을 표시합니다
  //       var infowindow = new kakao.maps.InfoWindow({
  //         content:
  //           '<div style="width:150px;text-align:center;padding:6px 0;">차량 위치</div>',
  //       });
  //       infowindow.open(map, marker);

  //       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
  //       map.setCenter(coords);
  //     }
  //   });
  // }, [locationOnMap]);

  // 익현 --------------------------------------------------

  const [locationObj, setLocationObj] = useState({});

  const getCoords = (locationOnMap) => {
    const headers = {
      Authorization: `KakaoAK ${mapKey}`,
    };
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${locationOnMap}`,
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

  const createMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // const resultX = locationObj.locationX;
    // const resultY = locationObj.locationY;

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

    console.log(coords);
  };

  useEffect(() => {
    if (locationOnMap !== undefined) getCoords(locationOnMap);
  }, [locationOnMap]);

  // 맵을 생성하는 함수를 처음 렌더링 그리고 locationObj가 변경될 때만 랜더링 하고
  useEffect(() => {
    createMap();
  }, [locationObj]);

  const locationX = locationObj.locationX;
  const locationY = locationObj.locationY;
  // 위도경도 값
  console.log(locationX, locationY);

  // --------------익현 끝 --------------------------------------

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
