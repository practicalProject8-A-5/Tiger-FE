// eslint-disable-next-line

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  __registeredItemList,
  __useItemList,
} from "../../redux/modules/ownerItemListSlice";
import { useDispatch } from "react-redux";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import CalenderBox from "../owner/CalenderBox";

const OwnerItem = ({ list, category, vid }) => {
  const serverApi = process.env.REACT_APP_SERVER;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vId = vid;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickCalender = (e) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const onClick = (e) => {
    navigate(`/vehicle/${vid}`);
  };

  const goUpdate = (e) => {
    e.stopPropagation();
    navigate(`/owner/${vid}/form`);
  };

  const deleteHandler = async (e) => {
    e.stopPropagation();
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
      RefreshToken: refreshToken,
    };
    await axios.delete(serverApi + `/vehicle/management/${vId}`, {
      headers: headers,
    });
    dispatch(__registeredItemList());
  };

  const returnHandler = async (oid) => {
    const orderId = oid;
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      await axios.post(
        serverApi + `/order/owner/return/${orderId}`,
        {},
        {
          headers: headers,
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {category === "Registration" ? (
        <StOwnerItem>
          <img
            src={list.thumbnail}
            alt="차량"
            onClick={onClick}
            loading="lazy"
          />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand} &nbsp;
              {list.vname}
            </p>
            <span>{list.oname}</span>
            <p>₩ {list.price}/ 1 일</p>
            <p className="carInfo__location">{list.location}</p>
          </div>
          <div className="flex_wrap">
            <div className="calender" onClick={onClickCalender}>
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
      ) : category === "Reservation" ? (
        <StOwnerItem>
          <img
            src={list.thumbnail}
            alt="차량"
            onClick={onClick}
            loading="lazy"
          />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand} &nbsp;
              {list.vname}
            </p>
            <p>
              ₩ {list.price}/
              {(new Date(list.endDate).getTime() -
                new Date(list.startDate).getTime()) /
                (1000 * 3600 * 24) +
                1}
              일
            </p>
            <p className="carInfo__location">{list.location}</p>
          </div>
          <div className="flex_wrap">
            <div className="item_date">
              <div>{list.startDate}</div>
              <span>~</span>
              <span>{list.endDate}</span>
            </div>
          </div>
        </StOwnerItem>
      ) : category === "progress" ? (
        <StOwnerItem>
          <img
            src={list.thumbnail}
            alt="차량"
            onClick={onClick}
            loading="lazy"
          />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand} &nbsp;
              {list.vname}
            </p>
            <p>
              ₩ {list.price}/
              {(new Date(list.endDate).getTime() -
                new Date(list.startDate).getTime()) /
                (1000 * 3600 * 24) +
                1}
              일
            </p>
            <p className="carInfo__location">{list.location}</p>
          </div>
          <div className="flex_wrap">
            <span className="item_date">
              {list.startDate}
              <span>~</span>
              {list.endDate}
            </span>
            <div className="btn_box">
              <span
                className="delete"
                onClick={() => {
                  returnHandler(list.oid);
                  dispatch(__useItemList());
                }}>
                반납확인
              </span>
            </div>
          </div>
        </StOwnerItem>
      ) : category === "return" ? (
        <StOwnerItem>
          <img
            src={list.thumbnail}
            alt="차량"
            onClick={onClick}
            loading="lazy"
          />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand} &nbsp;
              {list.vname}
            </p>
            <p>
              ₩ {list.price}/
              {(new Date(list.endDate).getTime() -
                new Date(list.startDate).getTime()) /
                (1000 * 3600 * 24) +
                1}
              일
            </p>
            <p className="carInfo__location">{list.location}</p>
          </div>
          <div className="flex_wrap">
            <span className="item_date">
              {list.startDate}
              <span>~</span>
              {list.endDate}
            </span>
            <div className="btn_box">
              <span className="modify"></span>
            </div>
          </div>
        </StOwnerItem>
      ) : category === "Refund" ? (
        <StOwnerItem>
          <img
            src={list.thumbnail}
            alt="차량"
            onClick={onClick}
            loading="lazy"
          />
          <div className="carInfo" onClick={onClick}>
            <p>
              {list.vbrand} &nbsp;
              {list.vname}
            </p>
            <p>
              ₩ {list.price}/
              {(new Date(list.endDate).getTime() -
                new Date(list.startDate).getTime()) /
                (1000 * 3600 * 24) +
                1}
              일
            </p>
            <p className="carInfo__location">{list.location}</p>
          </div>
          <div className="flex_wrap">
            <span className="item_date">
              {list.startDate} ~ {list.endDate}
            </span>
            <div className="btn_box">
              <span className="modify"></span>
              <span className="delete">환불완료</span>
            </div>
          </div>
        </StOwnerItem>
      ) : null}
    </>
  );
};

const StOwnerItem = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  height: 134px;
  img {
    width: 32%;
    height: 134px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
  .carInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 48%;
    p {
      margin-bottom: 11px;
      font-weight: 500;
      font-size: 18px;
      color: #000;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    span {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      margin-bottom: 13px;
    }
    &__location {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .dateBtn {
    width: 97px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .flex_wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 11%;
    .calender {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .calender__icon {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .item_date {
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .btn_box {
      margin-bottom: 11px;
      display: flex;
      justify-content: end;
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
  @media (min-width: 768px) and (max-width: 1023px) {
    img {
      width: 40%;
      object-fit: cover;
      border-radius: 12px;
      margin-right: 24px;
    }
    .carInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 62%;
      font-size: 12px;
    }
  }
  @media (max-width: 767px) {
    .carInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 44%;
      p {
        margin-bottom: 11px;
        font-weight: 500;
        font-size: 18px;
        color: #000;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      span {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        color: #8b8b8b;
        margin-bottom: 13px;
      }
      &__location {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .flex_wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 19%;
    }
  }
`;

export default OwnerItem;
