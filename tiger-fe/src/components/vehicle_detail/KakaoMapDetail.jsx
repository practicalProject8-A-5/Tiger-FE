/*global kakao*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import axios from "axios";

const KakaoMapDetail = ({ vehicleDetails }) => {
  // const mapKey = process.env.REACT_APP_REST_API_KEY;

  // const vehicleDetails = useSelector(
  //   (state) => state.vehicleDetailSlice.vehicleDetailList
  // );
  // console.log(vehicleDetails);
  // console.log(vehicleDetails.locationX);
  // console.log(vehicleDetails.locationY);

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

    console.log(coords);
  };

  useEffect(() => {
    createMap();
  }, [vehicleDetails]);

  // --------------------------------------------------------------------------------

  // const [locationObj, setLocationObj] = useState({
  //   locationX: 100,
  //   locationY: 100,
  // });

  // const getCoords = async (vehicleDetailsLocation) => {
  //   const headers = {
  //     Authorization: `KakaoAK ${mapKey}`,
  //   };
  //   const response = await axios.get(
  //     `https://dapi.kakao.com/v2/local/search/address.json?query=${vehicleDetailsLocation}`,
  //     {
  //       headers: headers,
  //     }
  //   );
  //   console.log(response);
  //   setLocationObj({
  //     ...locationObj,
  //     locationX: response.data.documents[0].x,
  //     locationY: response.data.documents[0].y,
  //   });
  //   // return response.data.documents[0];

  //   // .then((res) => {
  //   //   console.log(res);
  //   //   const location = res.data.documents[0];
  //   //   console.log(location);
  //   //   // setLocationObj({
  //   //   //   ...locationObj,
  //   //   //   locationX: res.data.documents[0].x,
  //   //   //   locationY: res.data.documents[0].y,
  //   //   // });
  //   // });
  // };

  // const createMap = () => {
  //   const mapContainer = document.getElementById("map");
  //   const mapOption = {
  //     center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
  //     level: 3,
  //   };
  //   // 지도를 생성합니다
  //   var map = new kakao.maps.Map(mapContainer, mapOption);

  //   // const resultX = locationObj.locationX;
  //   // const resultY = locationObj.locationY;

  //   var coords = new kakao.maps.LatLng(
  //     locationObj.locationY,
  //     locationObj.locationX
  //   );

  //   var marker = new kakao.maps.Marker({
  //     map: map,
  //     position: coords,
  //   });

  //   // 인포윈도우로 장소에 대한 설명을 표시합니다
  //   var infowindow = new kakao.maps.InfoWindow({
  //     content:
  //       '<div style="width:150px;text-align:center;padding:6px 0;">차량 위치</div>',
  //   });
  //   infowindow.open(map, marker);

  //   // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
  //   map.setCenter(coords);

  //   console.log(coords);
  // };

  // // getCoords함수는 처음 랜더링때와 주소가 호출 됐을때 렌더링
  // // getCoords & createMap이 연결 되어 있기 때문에 서로 무한루프 발생
  // useEffect(() => {
  //   if (vehicleDetailsLocation !== undefined) getCoords(vehicleDetailsLocation);
  // }, [vehicleDetailsLocation]);

  // // 맵을 생성하는 함수를 처음 렌더링 그리고 locationObj가 변경될 때만 랜더링 하고
  // useEffect(() => {
  //   createMap();
  // }, [locationObj]);

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
`;

const StVehicleMapBox = styled.div`
  width: 840px;
  height: 286px;
  margin-bottom: 15px;
`;

export default React.memo(KakaoMapDetail);
