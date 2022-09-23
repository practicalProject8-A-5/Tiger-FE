// eslint-disable-next-line

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { __isLike } from "../../redux/modules/likeSlice";
import like from "../../assets/Love.png";
import liked from "../../assets/liked.png";
import styled from "styled-components";

const FliteredVehicle = ({ list }) => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(list.heart);

  const likeClickHandler = () => {
    dispatch(__isLike(list.vid));
    setIsLike(!isLike);
  };

  useEffect(() => {
    setIsLike(list.heart);
    return () => {
      setIsLike(!isLike);
    };
  }, []);

  return (
    <StItem>
      <StSwiper
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide className="img">
          <img src={list.thumbnail} alt="imageSlide" />
        </SwiperSlide>
      </StSwiper>
      {email ? (
        isLike === true ? (
          <span className="heart" onClick={likeClickHandler}>
            <img src={liked} alt="liked" />
          </span>
        ) : (
          <span className="heart" onClick={likeClickHandler}>
            <img src={like} alt="liked" />
          </span>
        )
      ) : (
        <span className="heart" style={{ display: "none" }}></span>
      )}
      <div
        className="desc__box"
        onClick={() => {
          navigate(
            `/vdetail/${list.vid}?startDate=${list.startDate}&endDate=${list.endDate}`
          );
        }}>
        <div className="desc__top">
          <div className="desc__title">{list.location}</div>
          <div className="desc__star">4.12</div>
        </div>
        <p>
          {list.vname} / {list.fuelType}
        </p>
        <p className="dates">
          {list.startDate} ~ {list.endDate}
        </p>
        <div className="desc__bottom">
          ₩{list.price} <span>/1일</span>
        </div>
      </div>
    </StItem>
  );
};

const StItem = styled.div`
  width: 318px;
  height: 421px;
  position: relative;
  cursor: pointer;
  .heart {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 100;
    img {
      height: 25px;
      width: 25px;
    }
  }
  .desc__box {
    margin-top: 19px;
    width: 315px;
    height: 102px;
    .desc__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 6px;
      .desc__title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      /* .desc__star {
      } */
    }
    p {
      font-weight: 500;
      font-size: 18px;
      color: #777777;
    }
    .km {
      margin: 5px 0 7px 0;
    }
    .dates {
      margin: 5px 0 7px 0;
    }
    .desc__bottom {
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      span {
        color: #777777;
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
  &:hover .swiper-button-next {
    opacity: 1;
  }
  &:hover .swiper-button-prev {
    opacity: 1;
  }
`;

const StSwiper = styled(Swiper)`
  width: 318px;
  height: 300px;
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  img {
    width: 318px;
    height: 300px;
    object-fit: cover;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
    border-radius: 20px;
  }
`;

export default FliteredVehicle;
