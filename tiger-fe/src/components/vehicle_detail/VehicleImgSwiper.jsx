// eslint-disable-next-line

import React from "react";

import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";

import tempImage from "../../assets/optimize1.webp";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const imgDir = [
  {
    image: "../../assets/optimize1.webp",
  },
  {
    image: "../../assets/optimize2.webp",
  },
  {
    image: "../../assets/optimize3.webp",
  },
  {
    image: "../../assets/optimize4.webp",
  },
];

const VehicleImgSwiper = () => {
  SwiperCore.use([Navigation, Scrollbar]);

  const styles = { height: "auto" };

  return (
    <>
      <StNewSwiper
        className="imageSwiperContainer"
        centeredSlides={true}
        spaceBetween={8}
        slidesPerView={1}
        scrollbar={{ draggable: true, dragSize: 24 }}
        navigation={true}>
        {/* 추후 서버와 연결후 사용 예정 */}
        {/* {companies.imgUrlList &&
          companies.imgUrlList.map((image, index) => {
            return (
              <SwiperSlide className="image" key={index} style={styles}>
                <img src={image.imgUrl} alt="imageSlide" />
              </SwiperSlide>
            );
          })} */}
        <SwiperSlide className="image" style={styles}>
          <img src={tempImage} alt="imageSlide" />
        </SwiperSlide>
      </StNewSwiper>
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

export default VehicleImgSwiper;
