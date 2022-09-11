/*global kakao*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

const KakaoMapDetail = () => {
  const vehicleDetailsLocation = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetailList.location
  );

  console.log(vehicleDetailsLocation);
  // (9~13) 리팩토링

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    // 이거 채운이가 필요
    geocoder.addressSearch(vehicleDetailsLocation, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
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
      }
    });
    // const map = new kakao.maps.Map(container, options);
    // const markerPosition = new kakao.maps.LatLng(
    //   37.365264512305174,
    //   127.10676860117488
    // );
    // const marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
    // marker.setMap(map);
  }, [vehicleDetailsLocation]);

  return (
    <StVehicleMapContainer>
      <h1>렌터지역</h1>
      <StVehicleMapBox id="map"></StVehicleMapBox>
      <h2>{vehicleDetailsLocation}</h2>
    </StVehicleMapContainer>
  );
};

const StVehicleMapContainer = styled.div`
  border-top: 1px solid #cccccc;
  h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 24px;
    margin-top: 48px;
  }
  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
  }
`;

const StVehicleMapBox = styled.div`
  width: 840px;
  height: 286px;
  margin-bottom: 15px;
`;

export default KakaoMapDetail;
