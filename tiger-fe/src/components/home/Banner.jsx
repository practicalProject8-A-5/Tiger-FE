import React from "react";
import styled from "styled-components";
import Banner from "../../assets/home_image/banner.png";
import Banner2 from "../../assets/home_image/banner2.png";
import Banner3 from "../../assets/home_image/banner3.png";
// import Event from "../../assets/home_image/event.png";

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
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img src={Banner} alt="배너2" loading="lazy" />
            <div className="text_box">
              <p>즉흥적인 여행에 차가 없다면?</p>
              <span>타,이거</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner2} alt="배너3" loading="lazy" />
            <div className="text_box">
              <p>드림카를 타고 달려봐</p>
              <span>당신 근처의 모든 차 타,이거</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Banner3} alt="배너4" loading="lazy" />
            <div className="text_box">
              <p>차고에 방치된 차</p>
              <span>쓸모를 찾고 싶다면 타,이거</span>
            </div>
          </SwiperSlide>
        </StRegisterSwiper>
      </>
    </StBanner>
  );
};

export default banner;

const StBanner = styled.div`
  /* background-color: pink; */
  width: 100%;
  /* height: 660px; */
  position: relative;
`;
const StRegisterSwiper = styled(Swiper)`
  width: 100%;
  /* height: 660px; */
  position: static;
  img {
    width: 100%;
  }
  .text_box {
    width: 650px;
    position: absolute;
    bottom: 100px;
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
    span {
      margin-top: 20px;
    }
  }

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
  @media (min-width: 768px) and (max-width: 1023px) {
    img {
    }
    .text_box {
      width: 50%;
      position: absolute;
      bottom: 50px;
      left: 55px;
      font-weight: 600;
      font-size: 30px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      animation: text-show 2s;
      z-index: 1;
      /* background-color: pink; */
      span {
        margin-top: 10px;
      }
    }
    .swiper-pagination {
      position: absolute;
      top: 20px;
      right: 0;
      display: flex;
      justify-content: flex-end;
      transition: all 0.4s;
      .swiper-pagination-bullet {
        width: 20px;
        height: 8px;
        background: #b7b5b5;
        border-radius: 0;
        border-radius: 4px;
      }
      .swiper-pagination-bullet-active {
        width: 50px;
        height: 8px;
        background: #ffffff;
        border-radius: 0;
        border-radius: 4px;
        transition: all 0.4s;
      }
    }
  }
  @media (max-width: 767px) {
    img {
    }
    .text_box {
      width: 25%;
      position: absolute;
      bottom: 50px;
      left: 55px;
      font-weight: 600;
      font-size: 20px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      animation: text-show 2s;
      z-index: 1;
      /* background-color: skyblue; */
      text-align: center;
      span {
        margin-top: 5px;
      }
    }
    .swiper-pagination {
      .swiper-pagination-bullet {
        width: 13px;
        height: 8px;
        background: #b7b5b5;
        border-radius: 0;
        border-radius: 4px;
      }
      .swiper-pagination-bullet-active {
        width: 40px;
        height: 8px;
        background: #ffffff;
        border-radius: 0;
        border-radius: 4px;
        transition: all 0.4s;
      }
    }
  }
`;
