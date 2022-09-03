import React from "react";
import styled from "styled-components";
import img from "../../assets/img_1.jpg";

const OwnerItem = ({ list }) => {
  return (
    <StOwnerItem>
      <img src={list.thumbnail} alt="차량" />
      <div className="carInfo">
        <p>{list.vname}</p>
        <span>2022-09-03 ~ 2022-09-05</span>
        <p>{list.price}/1일</p>
        <p>{list.location}</p>
      </div>
      <div className="dateBtn">{list.createdAt}</div>
    </StOwnerItem>
  );
};

export default OwnerItem;

const StOwnerItem = styled.div`
  width: 100%;
  height: 134px;
  /* background-color: skyblue; */
  display: flex;
  position: relative;
  margin-bottom: 40px;
  img {
    width: 250px;
    height: 134px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
  .carInfo {
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin-bottom: 11px;
      font-weight: 500;
      font-size: 18px;
      color: #000;
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      margin-bottom: 13px;
    }
  }
  .dateBtn {
    width: 97px;
    height: 20px;
    /* background-color: yellowgreen; */
    position: absolute;
    top: 0;
    right: 0;
  }
`;
