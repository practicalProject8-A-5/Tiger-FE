// eslint-disable-next-line

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { setNotification } from "../../redux/modules/chatSlice";
import chat_icon from "../../assets/chat_icon.png";

// 우측 하단 채팅 플로팅 버튼
const ChatFloat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isChatModalOn = useMatch("/chat/*");
  const notification = useSelector((state) => state.chatSlice.notification);
  console.log("notification :", notification);

  const user = useSelector((state) => state.memberSlice.userInfo.id);
  const userId = parseInt(user);
  console.log("userId :", userId);

  const eventSource = useRef();

  const authorization = localStorage.getItem("userToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (userId) {
      // SSE 구독 요청
      console.log("sse: ", userId);
      eventSource.current = new EventSource(
        `${process.env.REACT_APP_CHAT}/user/subscribe/${userId}`,
        {
          headers: {
            Authorization: authorization,
            RefreshToken: refreshToken,
          },
        }
      );

      // 서버에서 메시지가 전송될 때 실행되는 함수
      eventSource.current.onmessage = (message) => {
        console.log("서버에서 메시지가 전송될 때 실행되는 함수 :", message);
        if (!message.data.includes("EventStream Created")) {
          dispatch(setNotification(true));
        }
      };
    }
    return () => {
      // 언마운트 시 연결 종료
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, [userId, dispatch, authorization]);

  return (
    <>
      {user && !isChatModalOn && (
        <FloatWrap>
          <Link
            to="/chat"
            state={{ backgroundLocation: location }}
            style={{ textDecoration: "none" }}>
            <ChatButtonWrap>
              <ChatButton>
                {notification && <NewNoti />}
                <img src={chat_icon} alt="chat icon" />
              </ChatButton>
            </ChatButtonWrap>
          </Link>
        </FloatWrap>
      )}
    </>
  );
};

const FloatWrap = styled.div`
  z-index: 99;
  position: fixed;
  bottom: 124px;
  right: 250px;
  @media screen and (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;
const ChatButtonWrap = styled.div`
  width: 64px;
  height: 64px;
  line-height: 64px;
  border-radius: 50px;
  border: none;
  background: #ffb979;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  cursor: pointer;
  div {
    text-align: center;
    @media screen and (max-width: 768px) {
      padding-top: 14px;
    }
  }
  span {
    display: block;
    padding-top: 0px;
    @media screen and (max-width: 768px) {
      padding-top: 5px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 67px;
    height: 67px;
  }
`;
const ChatButton = styled.div`
  position: relative;
  span {
    color: black;
  }
  img {
    width: 34px;
    height: 34px;
    padding-top: 17px;
  }
`;
const NewNoti = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  right: 0px;
  bottom: 60px;
  background-color: #eb3434;
  @media screen and (max-width: 768px) {
    right: 2px;
    bottom: 40px;
  }
  &:before {
    position: absolute;
    left: 0;
    top: -10%;
    width: 100%;
    height: 120%;
    background: #eb3434;
    filter: blur(5px);
    content: "";
    opacity: 0;
    animation: flash 0.9s ease-out alternate infinite;
  }
  @keyframes flash {
    to {
      opacity: 1;
    }
  }
`;

export default ChatFloat;
