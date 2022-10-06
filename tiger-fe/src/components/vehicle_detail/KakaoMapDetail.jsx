// eslint-disable-next-line

/*global kakao*/
import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoMapDetail = ({ vehicleDetails }) => {
  const createMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var coords = new kakao.maps.LatLng(
      vehicleDetails.locationY,
      vehicleDetails.locationX
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
  };

  useEffect(() => {
    createMap();
  }, [vehicleDetails]);

  return (
    <StVehicleMapContainer>
      <h1>렌터지역</h1>
      <StVehicleMapBox id="map"></StVehicleMapBox>
      <h2>{vehicleDetails.location}</h2>
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
  @media (max-width: 767px) {
    h1 {
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      margin-bottom: 14px;
      margin-top: 28px;
    }
  }
`;

const StVehicleMapBox = styled.div`
  height: 286px;
  margin-bottom: 15px;
`;

export default React.memo(KakaoMapDetail);
