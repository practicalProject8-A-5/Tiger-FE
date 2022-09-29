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

  const returnHandler = async (oid) => {
    // e.stopPropagation();
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
      // console.log("반납하기 성공", response);
    } catch (error) {
      // console.log("반납하기 실패", error);
      return error;
    }
  };

  const [commentModal, setCommentModal] = useState(false);
  const [singleVehicle, setSingleVehicle] = useState({});

  const showCommentModal = (list) => {
    setCommentModal(!commentModal);
    setSingleVehicle(list);
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
                                Authorization:
                                  localStorage.getItem("userToken"),
                                RefreshToken:
                                  localStorage.getItem("refreshToken"),
                              },
                            }
                          );
                          // console.log(response);
                          navigate(`/chat/${response.data}`, {
                            state: { backgroundLocation: location },
                          });
                        } catch (error) {
                          // console.log(error);
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
                  navigate(`/vdetail/${list.vid}`);
                }}
                key={i}>
                <img src={list.thumbnail} alt="차량" />
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
                                Authorization:
                                  localStorage.getItem("userToken"),
                                RefreshToken:
                                  localStorage.getItem("refreshToken"),
                              },
                            }
                          );
                          // console.log(response);
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
                    {/* <span
                      className="return"
                      onClick={() => {
                        returnHandler(list.oid);
                      }}>
                      반납
                    </span> */}
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
                                Authorization:
                                  localStorage.getItem("userToken"),
                                RefreshToken:
                                  localStorage.getItem("refreshToken"),
                              },
                            }
                          );
                          // console.log(response);
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
                    onClick={() => {
                      navigate(`/vdetail/${list.vid}`);
                    }}
                  />
                  <div
                    className="carInfo"
                    onClick={() => {
                      navigate(`/vdetail/${list.vid}`);
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
                      {/* <div
                        className="comments"
                        onClick={() => {
                          showCommentEditModal(list);
                        }}>
                        수정
                      </div> */}
                    </div>
                  </div>
                </StRenterItem>
                {commentModal && (
                  <CommentModal
                    showCommentModal={showCommentModal}
                    singleVehicle={singleVehicle}
                  />
                )}
                {/* {commentEditModal && (
                  <CommentEditModal
                    showCommentEditModal={showCommentEditModal}
                    singleVehicle={singleVehicle}
                  />
                )} */}
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
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
                  }}
                />
                <div
                  className="carInfo"
                  onClick={() => {
                    navigate(`/vdetail/${list.vid}`);
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
      display: flex;
      flex-direction: column;
      align-items: center;
      /* background-color: pink; */
    }
    .btn_box {
      margin-bottom: 11px;
      display: flex;
      justify-content: end;
      /* background-color: yellow; */
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
`;

export default RenterItem;
