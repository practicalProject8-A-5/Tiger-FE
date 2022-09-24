// eslint-disable-next-line

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { getRoomListDB, setNotification } from "../../redux/modules/chatSlice";
import ChatRoom from "./ChatRoom";
import ChatRoomList from "./ChatRoomList";
import chatIcon from "../../assets/chat_icon2.png";
import exit from "../../assets/exit_icon.png";

// 채팅 모달
const ChatModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMatchChat = useMatch("/chat");
  const { roomId } = useParams();

  const userInfo = useSelector((state) => state.memberSlice.userInfo);

  const onClickClose = () => {
    const confirm = window.confirm("채팅방을 나가시겠어요?");
    if (confirm === true) {
      navigate(location.state.backgroundLocation);
    } else if (confirm === false) {
      return;
    }
  };
  console.log(location.state);

  const onClickBack = () => {
    navigate("/chat", {
      state: { backgroundLocation: location.state.backgroundLocation },
    });
  };

  useEffect(() => {
    dispatch(getRoomListDB());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setNotification(false));
    };
  }, [dispatch]);

  // 화면 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <FloatWrap>
      <Dim />
      <Wrap>
        <LeftWrap isRoom={roomId}>
          <Title>채팅</Title>
          <ListWrap>
            <ChatRoomList location={location} roomId={roomId} />
          </ListWrap>
        </LeftWrap>

        <RoomWrap isRoom={roomId}>
          <Header isRoom={roomId}>
            <div className="userInfoChat">
              <img src={userInfo.profileImage} alt="profileImage" />
              <div className="userInfoChat__name">{userInfo.name}</div>
            </div>
            {roomId && (
              <div className="backToChatRoom" onClick={onClickBack}>
                뒤로가기
              </div>
            )}
            <span onClick={onClickClose}>
              <img src={exit} alt="exitButton" />
            </span>
          </Header>
          {isMatchChat && (
            <HelpMessage>
              <div>
                <img src={chatIcon} alt="chatIcon" />
              </div>
              <>
                <span className="checkMessage">메세지를 확인해주세요.</span>
                <br />
                <span className="checkList">
                  왼쪽 리스트에서 렌트/오너와 대화를 이어가보세요!
                </span>
              </>
            </HelpMessage>
          )}
          {roomId && <ChatRoom roomId={roomId} />}
        </RoomWrap>
      </Wrap>
    </FloatWrap>
  );
};

const FloatWrap = styled.div`
  z-index: 99;
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
const Dim = styled.div`
  box-sizing: border-box;
  display: "block";
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 75%;
  height: 82%;
  max-width: 1360px;
  max-height: 1160px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  border-radius: 24px;
  z-index: 10000;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const Title = styled.div`
  margin: 24px;
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  span {
    cursor: pointer;
    /* @media screen and (min-width: 768px) {
      display: none;
    } */
  }
`;
const LeftWrap = styled.div`
  width: 35%;
  /* @media screen and (max-width: 768px) {
    display: none;
    width: 100%;
  } */
`;
const ListWrap = styled.div`
  height: 80%;
  overflow-y: auto;
  border-top: 3px solid #eee;
`;
const RoomWrap = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column-reverse;
  border-left: 3px solid #eee;
  position: relative;
  /* @media screen and (max-width: 768px) {
    display: none;
    width: 100%;
  } */
`;
const Header = styled.div`
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 15px 0px 15px 0;
  border-radius: 0px 30px 0 0;
  top: 0;
  border-bottom: 3px solid #eee;
  position: absolute;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 20px 20px 5px 0;
  }
  span {
    cursor: pointer;
    position: absolute;
    right: 20px;
    width: 21px;
    height: 21px;
    top: 18px;
  }
  .backToChatRoom {
    cursor: pointer;
    color: black;
    background-color: #fff;
    border: solid 1px black;
    font-size: 12px;
    padding: 6px 10px;
    position: absolute;
    z-index: 2;
    top: 18px;
    right: 123px;
    border-radius: 15px;
    /* @media screen and (min-width: 768px) {
      display: none;
    } */
  }
  .userInfoChat {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    gap: 15px;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    &__name {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
    }
  }
`;
const HelpMessage = styled.div`
  font-size: 27px;
  text-align: center;
  line-height: 1.2;
  margin: auto 0;
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }
  .checkMessage {
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 35px;
  }
  .checkList {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    color: #8b8b8b;
  }
`;

export default ChatModal;
