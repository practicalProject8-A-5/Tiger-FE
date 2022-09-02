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

  const styles = { height: "auto" };

  // get request for vehicle info
  const vehicleDetails = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetailList
  );
  console.log(vehicleDetails);

  return (
    <>
      <StNewSwiper
        className="imageSwiperContainer"
        centeredSlides={true}
        spaceBetween={8}
        slidesPerView={1}
        scrollbar={{ draggable: true, dragSize: 24 }}
        navigation={true}>
        {vehicleDetails.imagesList &&
          vehicleDetails.imagesList.map((image, i) => {
            return (
              <SwiperSlide className="image" key={i} style={styles}>
                <img src={image[i]} alt="imageSlide" />
              </SwiperSlide>
            );
          })}
      </StNewSwiper>
      <StVehicleInfoWrap>
        <div>
          <h1>이름: {vehicleDetails.vname}</h1>
          <h1>연식: {vehicleDetails.years}</h1>
          <h1>종류: {vehicleDetails.type}</h1>
          <h1>자동: {vehicleDetails.transmission}</h1>
          <h1>인승: {vehicleDetails.passengers}</h1>
          <h1>주소: {vehicleDetails.location}</h1>
          <h1>가격: {vehicleDetails.price}</h1>
          <h1>연비: {vehicleDetails.fuelEfficiency}</h1>
          <h1>설명: {vehicleDetails.description}</h1>
          <h1>휘발유: {vehicleDetails.fuelType}</h1>
        </div>
      </StVehicleInfoWrap>
    </>
  );
};

const StNewSwiper = styled(Swiper)`
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
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

const StVehicleInfoWrap = styled.div`
  display: block;
`;

export default VehicleDetailLeft;
