// eslint-disable-next-line

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";

import { __vehicleDetail } from "../../redux/modules/vehicleDetail";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const VehicleDetailLeft = () => {
  SwiperCore.use([Navigation, Scrollbar]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__vehicleDetail());
  }, [dispatch]);

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
        <div>
          <h1>종류: {vehicleDetails.type}</h1>
          <h1>자동: {vehicleDetails.transmission}</h1>
          <h1>인승: {vehicleDetails.passengers}</h1>
          <h1>연비: {vehicleDetails.fuelEfficiency}</h1>
          <h1>설명: {vehicleDetails.description}</h1>
          <h1>휘발유: {vehicleDetails.fuelType}</h1>
        </div>

        <h1>대여요금 {vehicleDetails.price}</h1>
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

export default VehicleDetailLeft;
