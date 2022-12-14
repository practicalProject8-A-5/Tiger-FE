// eslint-disable-next-line

import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
// import Stomp from "stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import {
  addMessage,
  getRoomListDB,
  readMessage,
  updateRoomMessage,
} from "../../redux/modules/chatSlice";
import ChatList from "./ChatList";
import axios from "axios";
import send from "../../assets/send_icon.png";

// 채팅 모달 > 채팅방
const ChatRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { roomId } = useParams();
  const roomIdNum = parseInt(roomId);

  const inputRef = useRef();
  let stompClient = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.memberSlice.userInfo);

  const senderId = parseInt(user.id);

  const authorization = localStorage.getItem("userToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const chatApi = process.env.REACT_APP_CHAT;

  // 웹소켓 연결 요청 & 구독 요청
  const socketConnect = () => {
    const webSocket = new SockJS(`${chatApi}/wss-stomp`);
    stompClient.current = webstomp.over(webSocket);
    // STOMPJS console log 지워주는 부분
    // stompClient.current.debug = null;
    stompClient.current.connect(
      {
        Authorization: authorization,
        RefreshToken: refreshToken,
        type: "TALK",
      },
      // 연결 성공 시 실행되는 함수
      () => {
        stompClient.current.subscribe(
          `/sub/chat/room/${roomId}`,
          (response) => {
            const messageFromServer = JSON.parse(response.body);
            dispatch(addMessage(messageFromServer));
            dispatch(
              updateRoomMessage({
                ...messageFromServer,
                index: location.state.index ?? 0,
              })
            );
          },
          { Authorization: authorization, RefreshToken: refreshToken }
        );
        setIsLoading(false);
      }
    );
  };

  // 웹소켓 연결 해제
  const socketDisconnect = () => {
    stompClient.current.disconnect();
    stompClient.current = null;
  };

  // 메시지 전송
  const sendMessage = (event) => {
    event.preventDefault();

    const message = event.target.chat.value;
    if (message === "" || message.trim() === "") return false;

    const messageObj = {
      roomId: roomIdNum,
      senderId: senderId,
      message: event.target.chat.value,
      isRead: false,
      type: "TALK",
      name: user.name,
    };

    stompClient.current.send(`/pub/chat/message`, JSON.stringify(messageObj), {
      Authorization: authorization,
      RefreshToken: refreshToken,
    });

    event.target.chat.value = null;
  };

  useEffect(() => {
    setIsLoading(true);
    inputRef.current.value = "";

    // 채팅방 전환 시 기존 연결 해제 후 새 연결 요청
    if (stompClient.current) {
      socketDisconnect();
    }
    socketConnect();

    return () => {
      // 언마운트 시 연결 해제
      if (stompClient.current) socketDisconnect();
      dispatch(readMessage(location.state.index));
    };
  }, [roomId]);

  // 채팅방 나가기
  const exitRoom = async () => {
    const confirm = window.confirm("채팅방을 나가시겠어요?");
    const headers = {
      "Content-Type": "application/json",
      Authorization: authorization,
      RefreshToken: refreshToken,
    };
    if (confirm) {
      await axios.get(`${chatApi}/chat/room/exit/${roomId}`, {
        headers: headers,
      });
      dispatch(getRoomListDB()).then(() => navigate(-1));
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loadingIcon">
          <CircularProgress />
        </div>
      )}
      <ChatInputWrap>
        <form onSubmit={sendMessage}>
          <ChatInput
            ref={inputRef}
            name="chat"
            autoComplete="off"
            placeholder="메시지를 입력해주세요."
            maxLength={150}
          />
          <SendButton></SendButton>
        </form>
      </ChatInputWrap>
      <ChatList />
      <ExitButton onClick={exitRoom}>나가기</ExitButton>
    </>
  );
};

const ChatInputWrap = styled.div`
  margin: 0 30px 30px 30px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 4px;
  @media screen and (max-width: 768px) {
    margin: 0 10px 10px 10px;
  }
`;
const ChatInput = styled.input`
  border: none;
  width: calc(100% - 60px);
  text-indent: 20px;

  &:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 90px);
    padding: 20px 10px 20px 15px;
    font-size: 14px;
  }
`;
const SendButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 140, 40);
  width: fit-content;
  height: fit-content;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  width: 47px;
  height: 41px;
  background-image: url(${send});
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: sub;
`;
const ExitButton = styled.button`
  color: black;
  background-color: #fff;
  border: solid 1px black;
  font-size: 12px;
  position: absolute;
  z-index: 2;
  top: 18px;
  right: 60px;
  line-height: 4px;
  box-sizing: border-box;
  padding: 11px;
  border-radius: 15px;
  cursor: pointer;
`;

export default ChatRoom;
