import React from "react";
import { useState } from "react";
import styled from "styled-components";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const ModifyImgViewBox = ({ files, imageList }) => {
  //트러블 슈팅 하나짜리 이후에 여러개 다시 수정하면 버튼이 안눌림
  // console.log(imageList);
  // console.log(files.length);
  // console.log(files);

  return (
    <StModifyImgViewBox>
      {files.length === 1 ? (
        <StRegisterSwiper
        // pagination={{
        //   type: "fraction",
        //   clickable: true,
        // }}
        // navigation={true}
        // loop={true}
        // modules={[Pagination, Navigation]}
        // className="mySwiper"
        >
          {imageList.map((image, i) => {
            return (
              <SwiperSlide className="img" key={i}>
                <img src={image} alt="imageSlide" />
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
          className="mySwiper"
        >
          {imageList.map((image, i) => {
            return (
              <SwiperSlide className="img" key={i}>
                <img src={image} alt="imageSlide" />
              </SwiperSlide>
            );
          })}
        </StRegisterSwiper>
      )}
    </StModifyImgViewBox>
  );
};

export default ModifyImgViewBox;
const StModifyImgViewBox = styled.div`
  margin-top: 56px;
  img {
    width: 844px;
    height: 429px;
    object-fit: cover;
    /* background-color: pink; */
    border-radius: 12px;
  }
  &:hover .swiper-button-next {
    opacity: 1;
  }
  &:hover .swiper-button-prev {
    opacity: 1;
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
    /* opacity: 0.4; */
    span {
      opacity: 1;
      color: #000;
    }
  }
  .swiper-pagination {
    background-color: rgba(255, 255, 255, 0.4);
    /* background-color: pink; */
    position: absolute;
    bottom: 0;
    border-radius: 0 0 20px 20px;
  }
`;

// const StRegisterSwiperOne = styled(Swiper)`
//   .swiper-button-prev {
//     display: none;
//   }
//   .swiper-button-next {
//     display: none;
//   }
// `;