import React from "react";
import styled from "styled-components";
import Banner from "../../assets/home_image/banner.png";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

const banner = () => {
  return (
    <StBanner>
      <>
        <StRegisterSwiper
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          // navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}>
          <SwiperSlide>
            <img src={Banner} alt="배너1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner} alt="배너2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner} alt="배너3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner} alt="배너4" />
          </SwiperSlide>
        </StRegisterSwiper>
      </>
      <div className="text_box">
        <p>즉흥적인 여행에 차가 없다면?</p>
        <p>타,이거</p>
      </div>
    </StBanner>
  );
};

export default banner;

const StBanner = styled.div`
  /* background-color: pink; */
  width: 100%;
  height: 660px;
  position: relative;
  background-image: url(${Banner});
  .text_box {
    width: 650px;
    height: 127px;
    position: absolute;
    bottom: 101px;
    left: 55px;
    font-weight: 600;
    font-size: 48px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: text-show 2s;
    z-index: 1;

    @keyframes text-show {
      from {
        opacity: 0;
        transform: translateY(-70px);
      }
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
`;
const StRegisterSwiper = styled(Swiper)`
  background-color: pink;
  width: 100%;
  height: 660px;
  position: relative;
  .swiper-pagination {
    position: absolute;
    top: 20px;
    right: 0;
    display: flex;
    justify-content: flex-end;
    transition: all 0.4s;
    .swiper-pagination-bullet {
      width: 35px;
      height: 8px;
      background: #b7b5b5;
      border-radius: 0;
      border-radius: 4px;
    }
    .swiper-pagination-bullet-active {
      width: 100px;
      height: 8px;
      background: #ffffff;
      border-radius: 0;
      border-radius: 4px;
      transition: all 0.4s;
    }
  }
  .swiper-button-prev {
    position: absolute;
    z-index: 2;
    opacity: 1;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    display: block;
    text-align: center;
    transform: scale(1);
    transition: all 0.4s;
    :hover {
      transform: scale(1.25);
    }
    :after {
      line-height: 32px;
      font-size: 12px;
      font-weight: 700;
      color: #777777;
      right: 2px;
      position: relative;
    }
  }
  .swiper-button-next {
    position: absolute;
    z-index: 2;
    opacity: 1;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    display: block;
    text-align: center;
    transform: scale(1);
    transition: all 0.4s;
    :hover {
      transform: scale(1.25);
    }

    :after {
      line-height: 32px;
      font-size: 12px;
      font-weight: 700;
      color: #777777;
      left: 2px;
      position: relative;
    }
  }
`;
