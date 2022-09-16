// eslint-disable-next-line

import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getRenterItemList } from "../../redux/modules/renterItemListSlice";
import axios from "axios";

const RenterItem = ({ category, list, onSelect }) => {
  const serverApi = process.env.REACT_APP_SERVER;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renterItemLists = useSelector(
    (state) => state.renterItemListSlice.renterItemLists
  );
  console.log(renterItemLists);

  useEffect(() => {
    if (category) {
      dispatch(__getRenterItemList("RESERVED"));
    }
  }, [dispatch]);

  const deleteHandler = async (oid) => {
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
      RefreshToken: refreshToken,
    };
    const response = await axios.delete(serverApi + `/order/${oid}`, {
      headers: headers,
    });
    console.log(response);
    dispatch(__getRenterItemList("RESERVED"));
  };

  return (
    <div>
      <StRenterItemList>
        {renterItemLists.output && renterItemLists.output.length === 0 ? (
          <p>등록된 차량이 없습니다.</p>
        ) : category === "RESERVED" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem key={i}>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>
                    ₩{list.price}/
                    {(new Date(list.endDate).getTime() -
                      new Date(list.startDate).getTime()) /
                      (1000 * 3600 * 24) +
                      1}
                    일
                  </p>
                  <p className="carInfo__location">{list.location}</p>
                </div>
                {/* <div className="dateBtn">{list.createdAt}</div> */}
                <div className="flex_wrap">
                  <span className="item_date">
                    {list.startDate} ~ {list.endDate}
                  </span>
                  <div className="btn_box">
                    <span
                      className="refund"
                      onClick={() => {
                        deleteHandler(list.oid);
                      }}>
                      환불
                    </span>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : category === "CANCEL" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem
                onClick={() => {
                  navigate(`/vdetail/${list.vid}`);
                }}
                key={i}>
                <img src={list.thumbnail} alt="차량" />
                <div className="carInfo">
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                {/* <div className="dateBtn">{list.createdAt}</div> */}
                <div className="flex_wrap">
                  <span className="item_date">
                    {list.startDate} ~ {list.endDate}
                  </span>
                  <div className="btn_box">
                    <span className="refunded">환불 완료</span>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : category === "USE" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem key={i}>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                {/* <div className="dateBtn">{list.createdAt}</div> */}
                <div className="flex_wrap">
                  <span className="item_date">
                    {list.startDate} ~ {list.endDate}
                  </span>
                  <div className="btn_box">
                    {/* <span className="return">반납</span> */}
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : category === "RETURN" ? (
          renterItemLists.output &&
          renterItemLists.output.map((list, i) => {
            return (
              <StRenterItem key={i}>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                {/* <div className="dateBtn">{list.createdAt}</div> */}
                <div className="flex_wrap">
                  <span className="item_date">
                    {list.startDate} ~ {list.endDate}
                  </span>
                  <div className="btn_box">
                    <span className="returned">반납완료</span>
                  </div>
                </div>
              </StRenterItem>
            );
          })
        ) : null}
      </StRenterItemList>
    </div>
  );
};

const StRenterItemList = styled.div`
  width: 790px;
  height: 890px;
  margin-top: 65px;
`;

const StRenterItem = styled.div`
  width: 100%;
  height: 134px;
  display: flex;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  img {
    width: 250px;
    height: 134px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 24px;
  }
  .carInfo {
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
    .item_date {
      font-weight: 500;
      font-size: 16px;
      color: #8b8b8b;
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
      }
      .refund {
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-decoration: underline;
        cursor: pointer;
      }
      .returned,
      .refunded {
        font-weight: 500;
        font-size: 14px;
        color: #8b8b8b;
      }
      .return {
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

export default RenterItem;
