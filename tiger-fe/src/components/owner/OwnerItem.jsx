import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { __registeredItemList } from "../../redux/modules/ownerItemListSlice";
import { useDispatch } from "react-redux";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

import Calender from "./Calender";

import CalenderBox from "../owner/CalenderBox";

const OwnerItem = ({ list, category, vid }) => {
  const onClick = (e) => {
    navigate(`/vdetail/${vid}`);
  };
  const serverApi = process.env.REACT_APP_SERVER;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goUpdate = (e) => {
    e.stopPropagation();
    navigate(`/owner/${vid}/modi`);
  };

  const vId = vid;
  // console.log(vId);

  const deleteHandler = async (e) => {
    e.stopPropagation();
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
      RefreshToken: refreshToken,
    };
    const response = await axios.delete(
      serverApi + `/vehicle/management/${vId}`,
      {
        headers: headers,
      }
    );
    // console.log(response);
    dispatch(__registeredItemList());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("isOpenModal ===>", isModalOpen);

  const onClickCalender = (e) => {
    e.stopPropagation();
    // console.log("눌림");
    setIsModalOpen(!isModalOpen);
  };
  // console.log(isModalOpen);

  return (
    <>
      {category === "Registration" ? (
        <StOwnerItem>
          <img src={list.thumbnail} alt="차량" onClick={onClick} />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand} &nbsp;
              {list.vname}
            </p>
            <span>{list.oname}</span>
            <p>₩{list.price}/1일</p>
            <p>{list.location}</p>
          </div>
          {/* <div className="dateBtn">{list.createdAt}</div> */}
          <div className="flex_wrap">
            <span className="item_date">{list.createdAt}</span>
            <div className="calender" onClick={onClickCalender}>
              {/* <Calender /> */}
              <FaCalendarAlt />
            </div>
            <div className="btn_box">
              <span className="modify" onClick={goUpdate}>
                수정
              </span>
              <span className="delete" onClick={deleteHandler}>
                삭제
              </span>
            </div>
          </div>
          {isModalOpen && (
            <CalenderBox setIsModalOpen={setIsModalOpen} vId={vId} />
          )}
        </StOwnerItem>
      ) : (
        <StOwnerItem>
          <img src={list.thumbnail} alt="차량" onClick={onClick} />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand}
              {list.vname}
            </p>
            <span>오너 네임</span>
            <p>{list.price}/24시간</p>
            <p>{list.location}</p>
          </div>
          {/* <div className="dateBtn">{list.createdAt}</div> */}
          <div className="flex_wrap">
            <span className="item_date">{list.createdAt}</span>
          </div>
        </StOwnerItem>
      )}
    </>
  );
};

export default OwnerItem;

const StOwnerItem = styled.div`
  /* border: 1px solid; */
  width: 100%;
  /* height: 100%; */
  /* background-color: skyblue; */
  display: flex;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  img {
    width: 250px;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
  .carInfo {
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 430px;
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
    background-color: yellowgreen;
    position: absolute;
    top: 0;
    right: 0;
  }
  .flex_wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* position: relative; */
    .calender {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* background-color: khaki; */
      /* position: absolute;
      right: 0;
      top: 30px; */
      /* display: flex;
      justify-content: center;
      align-items: center; */
      .calender__icon {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .item_date {
      /* position: absolute; */
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      /* background-color: pink; */
      /* line-height: ; */
    }
    .btn_box {
      margin-bottom: 11px;
      display: flex;
      justify-content: space-around;
      /* background-color: pink; */
      .modify {
        font-weight: 500;
        font-size: 14px;
        color: #000;
        text-decoration: underline;
        margin-right: 12px;
        cursor: pointer;
      }
      .delete {
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
