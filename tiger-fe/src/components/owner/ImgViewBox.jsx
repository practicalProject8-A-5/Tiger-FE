// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const ImgViewBox = ({ files }) => {
  //트러블 슈팅 하나짜리 이후에 여러개 다시 수정하면 버튼이 안눌림
  return (
    <StImgViewBox>
      {files.length === 1 ? (
        <StRegisterSwiper>
          {files.map((image, i) => {
            return (
              <SwiperSlide className="img" key={i}>
                <img src={image} alt="imageSlide" loading="lazy" />
              </SwiperSlide>
            );
          })}
        </StRegisterSwiper>
      ) : (
        <StRegisterSwiper
          pagination={{
            type: "fraction",
            clickable: true,
          }}
          navigation={true}
          // loop={true}
          modules={[Pagination, Navigation]}
          className="mySwiper">
          {files.map((image, i) => {
            return (
              <SwiperSlide className="img" key={i}>
                <img src={image} alt="imageSlide" loading="lazy" />
              </SwiperSlide>
            );
          })}
        </StRegisterSwiper>
      )}
    </StImgViewBox>
  );
};

export default ImgViewBox;
const StImgViewBox = styled.div`
  img {
    width: 844px;
    height: 429px;
    object-fit: cover;
    border-radius: 12px;
  }
  &:hover .swiper-button-next {
    opacity: 1;
  }
  &:hover .swiper-button-prev {
    opacity: 1;
  }
  @media (max-width: 767px) {
    img {
      width: 100%;
      object-fit: fill;
      height: auto;
    }
  }
`;

const StRegisterSwiper = styled(Swiper)`
  .swiper-button-next {
    opacity: 0;
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

  .swiper-button-prev {
    opacity: 0;
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
  .swiper-pagination {
    width: 100%;
    height: 20px;
    span {
      opacity: 1;
      color: #000;
    }
  }
  .swiper-pagination {
    background-color: rgba(255, 255, 255, 0.4);
    position: absolute;
    bottom: 0;
    border-radius: 0 0 20px 20px;
  }
`;
