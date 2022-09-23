// eslint-disable-next-line

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";
import { setNotification } from "../../redux/modules/chatSlice";
import { SmileChatSVG } from "../../global_elements/Svg";

// 우측 하단 채팅 플로팅 버튼
const ChatFloat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isChatModalOn = useMatch("/chat/*");
  const notification = useSelector((state) => state.chatSlice.notification);
  console.log("notification :", notification);
  // 추후 memberId or userId 연결해야함
  const userId = useSelector((state) => state.memberSlice.userInfo.id);
  console.log("userId :", userId);

  const eventSource = useRef();

  const authorization = localStorage.getItem("userToken");

  useEffect(() => {
    if (userId) {
      // SSE 구독 요청
      eventSource.current = new EventSource(
        `${process.env.REACT_APP_CHAT}/user/subscribe/${userId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );

      // 서버에서 메시지가 전송될 때 실행되는 함수
      eventSource.current.onmessage = (message) => {
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
      {userId && !isChatModalOn && (
        <FloatWrap>
          <Link
            to="/chat"
            state={{ backgroundLocation: location }}
            style={{ textDecoration: "none" }}>
            <ChatButtonWrap>
              <ChatButton>
                {notification && <NewNoti />}
                <SmileChatSVG />
                <span>채팅</span>
              </ChatButton>
            </ChatButtonWrap>
          </Link>
        </FloatWrap>
      )}
    </>
  );
};

const FloatWrap = styled.div`
  z-index: 9;
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
  border-radius: 50px;
  border: none;
  background: #ffffff;
  box-shadow: 4px 4px 25px rgba(0, 25, 72, 0.21);
  font-size: 12px;
  cursor: pointer;
  div {
    text-align: center;
    padding-top: 9px;
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
`;
const NewNoti = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  right: 5px;
  bottom: 45px;
  background-color: orange;
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
    background: orange;
    filter: blur(10px);
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
