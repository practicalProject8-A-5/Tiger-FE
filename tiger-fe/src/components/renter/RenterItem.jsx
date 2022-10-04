// eslint-disable-next-line

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __getRenterItemList } from "../../redux/modules/renterItemListSlice";
import axios from "axios";
import CommentModal from "./CommentModal";
// import CommentEditModal from "./CommentEditModal";

const RenterItem = ({ category, list, onSelect }) => {
  const serverApi = process.env.REACT_APP_SERVER;
  const chatApi = process.env.REACT_APP_CHAT;

  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renterItemLists = useSelector(
    (state) => state.renterItemListSlice.renterItemLists
  );
  // console.log(renterItemLists);

  useEffect(() => {
    if (category === "RESERVED") {
      dispatch(__getRenterItemList("RESERVED"));
    }
  }, []);

  const deleteHandler = async (oid) => {
    const userToken = localStorage.getItem("userToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: userToken,
      RefreshToken: refreshToken,
    };
    await axios.delete(serverApi + `/order/${oid}`, {
      headers: headers,
    });
    dispatch(__getRenterItemList("RESERVED"));
  };

  const [commentModal, setCommentModal] = useState(false);
  const [singleVehicle, setSingleVehicle] = useState({});

  const showCommentModal = (list) => {
    setCommentModal(!commentModal);
    setSingleVehicle(list);
  };

  return (
    <StRenterItemList>
      {renterItemLists.output && renterItemLists.output.length === 0 ? (
        <p>예약된 차량이 없습니다.</p>
      ) : category === "RESERVED" ? (
        renterItemLists.output &&
        renterItemLists.output.map((list, i) => {
          return (
            <StRenterItem key={i}>
              <img
                src={list.thumbnail}
                alt="차량"
                loading="lazy"
                onClick={() => {
                  navigate(`/vehicle/${list.vid}`);
                }}
              />
              <div
                className="carInfo"
                onClick={() => {
                  navigate(`/vehicle/${list.vid}`);
                }}>
                <p>{list.vbrand}</p>
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
              <div className="flex_wrap">
                <div className="item_date">
                  <div>{list.startDate}</div>
                  <span>~</span>
                  <span>{list.endDate}</span>
                </div>
                <div className="btn_box">
                  <span
                    className="refund"
                    onClick={() => {
                      deleteHandler(list.oid);
                    }}>
                    환불
                  </span>
                  <div
                    className="chatButton"
                    onClick={async () => {
                      const ownerId = list.ownerId;
                      // console.log(list.ownerId);
                      try {
                        const response = await axios.post(
                          `${chatApi}/chat/room`,
                          {
                            ownerId,
                          },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: localStorage.getItem("userToken"),
                              RefreshToken:
                                localStorage.getItem("refreshToken"),
                            },
                          }
                        );
                        navigate(`/chat/${response.data}`, {
                          state: { backgroundLocation: location },
                        });
                      } catch (error) {
                        return error;
                      }
                    }}>
                    채팅하기
                  </div>
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
                navigate(`/vehicle/${list.vid}`);
              }}
              key={i}>
              <img src={list.thumbnail} alt="차량" loading="lazy" />
              <div className="carInfo">
                <p>{list.vbrand}</p>
                <p>{list.vname}</p>
                <span>{list.oname}</span>
                <p>₩{list.price}</p>
                <p>{list.location}</p>
              </div>
              <div className="flex_wrap">
                <div className="item_date">
                  <div>{list.startDate}</div>
                  <span>~</span>
                  <span>{list.endDate}</span>
                </div>
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
                loading="lazy"
                onClick={() => {
                  navigate(`/vehicle/${list.vid}`);
                }}
              />
              <div
                className="carInfo"
                onClick={() => {
                  navigate(`/vehicle/${list.vid}`);
                }}>
                <p>{list.vbrand}</p>
                <p>{list.vname}</p>
                <span>{list.oname}</span>
                <p>₩{list.price}</p>
                <p>{list.location}</p>
              </div>
              <div className="flex_wrap">
                <div className="item_date">
                  <div className="what">{list.startDate}</div>
                  <span>~</span>
                  <span>{list.endDate}</span>
                </div>
                <div className="btn_box">
                  <div
                    className="chatButton"
                    onClick={async () => {
                      const ownerId = list.ownerId;
                      // console.log(list.ownerId);
                      try {
                        const response = await axios.post(
                          `${chatApi}/chat/room`,
                          {
                            ownerId,
                          },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: localStorage.getItem("userToken"),
                              RefreshToken:
                                localStorage.getItem("refreshToken"),
                            },
                          }
                        );
                        navigate(`/chat/${response.data}`, {
                          state: { backgroundLocation: location },
                        });
                      } catch (error) {
                        return error;
                      }
                    }}>
                    채팅하기
                  </div>
                </div>
              </div>
            </StRenterItem>
          );
        })
      ) : category === "RETURN" ? (
        renterItemLists.output &&
        renterItemLists.output.map((list, i) => {
          return (
            <div key={list.vid}>
              <StRenterItem>
                <img
                  src={list.thumbnail}
                  alt="차량"
                  loading="lazy"
                  onClick={() => {
                    navigate(`/vehicle/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vehicle/${list.vid}`);
                  }}>
                  <p>{list.vbrand}</p>
                  <p>{list.vname}</p>
                  <span>{list.oname}</span>
                  <p>₩{list.price}</p>
                  <p>{list.location}</p>
                </div>
                <div className="flex_wrap">
                  <div className="item_date">
                    <div>{list.startDate}</div>
                    <span>~</span>
                    <span>{list.endDate}</span>
                  </div>
                  <div className="btn_box">
                    <span className="returned">반납완료</span>
                    <div
                      className="comments"
                      onClick={() => {
                        showCommentModal(list);
                      }}>
                      리뷰
                    </div>
                  </div>
                </div>
              </StRenterItem>
              {commentModal && (
                <CommentModal
                  showCommentModal={showCommentModal}
                  singleVehicle={singleVehicle}
                />
              )}
            </div>
          );
        })
      ) : category === "LIKE" ? (
        renterItemLists.output &&
        renterItemLists.output.map((list, i) => {
          return (
            <StRenterItem key={i}>
              <img
                src={list.thumbnail}
                alt="차량"
                loading="lazy"
                onClick={() => {
                  navigate(`/vehicle/${list.vid}`);
                }}
              />
              <div
                className="carInfo"
                onClick={() => {
                  navigate(`/vehicle/${list.vid}`);
                }}>
                <p>{list.vbrand}</p>
                <p>{list.vname}</p>
                <span>{list.oname}</span>
                <p>₩{list.price}</p>
                <p>{list.location}</p>
              </div>
            </StRenterItem>
          );
        })
      ) : null}
    </StRenterItemList>
  );
};

const StRenterItemList = styled.div`
  width: 57%;
  /* height: 890px; */
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }
`;

const StRenterItem = styled.div`
  width: 100%;
  height: 134px;
  display: flex;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
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
      .chatButton,
      .comments {
        font-weight: 500;
        font-size: 14px;
        width: auto;
        cursor: pointer;
        margin-left: 5px;
        text-decoration: underline;
      }
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
        .chatButton,
        .comments {
          font-weight: 500;
          font-size: 14px;
          width: auto;
          cursor: pointer;
          margin-left: 5px;
          text-decoration: underline;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .carInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 62%;
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
  }
`;

export default RenterItem;
