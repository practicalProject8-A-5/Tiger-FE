import React from "react";
import styled from "styled-components";
import img from "../../assets/img_1.jpg";

const Item = () => {
  return (
    <StItem>
      <img src={img} alt="car" />
      <span className="heart"></span>
      <div className="desc__box">
        <div className="desc__top">
          <div className="desc__title">서울특별시,korea</div>
          <div className="desc__star">4.12</div>
        </div>
        <p>벤츠, c-클래스 / 가솔린</p>
        <p className="km">11581km</p>
        <div className="desc__bottom">
          ₩2,1581 <span>/시간</span>
        </div>
      </div>
    </StItem>
  );
};

export default Item;

const StItem = styled.div`
  width: 318px;
  height: 421px;
  position: relative;
  cursor: pointer;
  img {
    width: 318px;
    height: 300px;
    object-fit: cover;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
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
      /* .desc__title {
      }
      .desc__star {
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
`;
