// eslint-disable-next-line

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { __isLike } from "../../redux/modules/likeSlice";
import like from "../../assets/Love.png";
import liked from "../../assets/liked.png";
import styled from "styled-components";
import { ImStarFull } from "react-icons/im";

const FliteredVehicle = ({ list }) => {
  // console.log("filterefVehicle");
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
  }, [list.heart]);

  // console.log(list);

  return (
    <StItem>
      <StSwiper
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="mySwiper">
        <SwiperSlide className="img">
          <img src={list.thumbnail} alt="imageSlide" loading="lazy" />
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
            `/vehicle/${list.vid}?startDate=${list.startDate}&endDate=${list.endDate}`
          );
        }}>
        <div className="desc__top">
          <div className="desc__title">{list.location}</div>
          <div className="desc__star">
            <div className="star_icon">
              <ImStarFull />
            </div>
            {list.averageRating}
          </div>
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
  width: 46%;
  height: 438px;
  position: relative;
  cursor: pointer;
  .heart {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 98;
    img {
      height: 25px;
      width: 25px;
    }
  }
  .desc__box {
    margin-top: 19px;
    width: 100%;
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
      .desc__star {
        display: flex;
        .star_icon {
          font-size: 15px;
          color: #ffb979;
          margin-right: 5px;
          line-height: 18px;
          margin-top: 2px;
        }
      }
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
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StSwiper = styled(Swiper)`
  width: 100%;
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
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export default FliteredVehicle;
