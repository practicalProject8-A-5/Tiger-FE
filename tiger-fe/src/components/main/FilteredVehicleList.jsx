// eslint-disable-next-line

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";
import NotFound from "../../global_elements/NotFound";

const FilteredVehicleList = () => {
  const navigate = useNavigate();

  const filteredVehicle = useSelector(
    (state) => state.vehicleDetailSlice.filteredVehicleList
  );
  console.log(filteredVehicle);

  const filteredVehicleLength = useSelector(
    (state) => state.vehicleDetailSlice.filteredVehicleLength
  );
  // console.log(filteredVehicle);

  return (
    <StItemList>
      {filteredVehicleLength.length === 0 ? (
        <NotFound
          upperText={<div>등록차량을 찾을수 없습니다.</div>}
          lowerText={
            <div>검색 조건을 변경하여 더 많은 차량을 찾아보세요!.</div>
          }
        />
      ) : (
        filteredVehicle.vehicleList &&
        filteredVehicle.vehicleList.map((list, index) => {
          return (
            <StItem key={index}>
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
              <span className="heart"></span>
              <div
                className="desc__box"
                onClick={() => {
                  navigate(
                    `/vdetail/${list.vid}?startDate=${filteredVehicle.startDate}&endDate=${filteredVehicle.endDate}`
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
                  {filteredVehicle.startDate} ~ {filteredVehicle.endDate}
                </p>
                <div className="desc__bottom">
                  ₩{list.price} <span>/1일</span>
                </div>
              </div>
            </StItem>
          );
        })
      )}
    </StItemList>
  );
};

const StItemList = styled.div`
  width: 100%;
  margin-top: 108px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 59px 46px;
`;

const StItem = styled.div`
  width: 318px;
  height: 421px;
  position: relative;
  cursor: pointer;

  /* background-color: pink; */

  .heart {
    width: 28px;
    height: 28px;
    background-color: pink;
    position: absolute;
    top: 18px;
    right: 18px;
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

export default FilteredVehicleList;
