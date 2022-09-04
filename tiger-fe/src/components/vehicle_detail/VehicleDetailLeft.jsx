// eslint-disable-next-line

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";

import KakaoMapDetail from "./KakaoMapDetail";

import { __vehicleDetail } from "../../redux/modules/vehicleDetail";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const VehicleDetailLeft = () => {
  SwiperCore.use([Navigation, Scrollbar]);

  const dispatch = useDispatch();

  const id = useParams();

  useEffect(() => {
    dispatch(__vehicleDetail(parseInt(id.id)));
  }, [dispatch, id]);

  // get response for vehicle info
  const vehicleDetails = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetailList
  );
  console.log(vehicleDetails);
  console.log(vehicleDetails.imageList);

  return (
    <>
      <StNewSwiper
        className="imageSwiperContainer"
        centeredSlides={true}
        spaceBetween={8}
        slidesPerView={1}
        scrollbar={{ draggable: true, dragSize: 24 }}
        navigation={true}>
        {vehicleDetails.imageList &&
          vehicleDetails.imageList.map((image, i) => {
            return (
              <SwiperSlide className="image" key={i}>
                <img src={image} alt="imageSlide" />
              </SwiperSlide>
            );
          })}
      </StNewSwiper>
      <StVehicleInfoContainer>
        <StVehicleInfoTitleWrapper>
          <h1>
            {vehicleDetails.years} <span>{vehicleDetails.vname}</span>
          </h1>
        </StVehicleInfoTitleWrapper>
        <StVehicleInfoLocationWrapper>
          <p>{vehicleDetails.location}</p>
        </StVehicleInfoLocationWrapper>
        <StVehicleInfoContentsWrapper>
          <p>종류: {vehicleDetails.type}</p>
          <p>자동: {vehicleDetails.transmission}</p>
          <p>인승: {vehicleDetails.passengers}</p>
          <p>연비: {vehicleDetails.fuelEfficiency}</p>
          <p>설명: {vehicleDetails.description}</p>
          <p>휘발유: {vehicleDetails.fuelType}</p>
        </StVehicleInfoContentsWrapper>
        <StRenterInfoWrapper>
          <div className="infoWrapper_nickname">
            <h1>렌터 닉네임</h1>
          </div>
          <div className="infoWrapper_personal">
            <p>렌터 전화번호</p>
            <p>렌터 이메일 주소</p>
          </div>
          <div className="infoWrapper_desc">
            <p>렌터 설명란</p>
          </div>
        </StRenterInfoWrapper>
        <KakaoMapDetail />
      </StVehicleInfoContainer>
    </>
  );
};

const StNewSwiper = styled(Swiper)`
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
  width: 79%;
  float: left;
  border-radius: 12px;
  .swiper-slide-active {
    /* width: auto !important; */
  }
  .swiper-button-next {
    right: 15px !important;
  }
  img {
    width: 844px;
    height: 429px;
    -o-object-fit: cover;
    object-fit: cover;
    outline: 1px solid rgba(0, 0, 0, 0.05);
    outline-offset: -1px;
    border-radius: 12px;
  }
`;

const StVehicleInfoContainer = styled.div`
  display: block;
  float: left;
  width: 79%;
`;

const StVehicleInfoTitleWrapper = styled.div`
  h1,
  span {
    margin-top: 29px;
    font-weight: 500;
    font-size: 38px;
    line-height: 52px;
  }
`;

const StVehicleInfoLocationWrapper = styled.div`
  p {
    font-family: 700;
    font-size: 18px;
    line-height: 25px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 64px;
  }
`;

const StVehicleInfoContentsWrapper = styled.div`
  border-bottom: 1px solid #cccccc;
  padding-bottom: 82px;
  p {
  }
`;

const StRenterInfoWrapper = styled.div`
  margin-top: 48px;
  .infoWrapper_nickname {
    font-weight: 400;
    font-size: 30px;
    line-height: 41px;
  }
  .infoWrapper_personal {
    margin-top: 90px;
    p {
      font-weight: 400;
      font-size: 30px;
      line-height: 41px;
    }
  }
  .infoWrapper_desc {
    margin-top: 145px;
    p {
      font-weight: 400;
      font-size: 30px;
      line-height: 41px;
    }
  }
`;

export default VehicleDetailLeft;
