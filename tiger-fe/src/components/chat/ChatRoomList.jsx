// eslint-disable-next-line

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

// 채팅 > 채팅방 목록
const ChatRoomList = ({ location, roomId }) => {
  const roomList = useSelector((state) => state.chatSlice.roomList);
  const userId = useSelector((state) => state.memberSlice.userInfo.id);

  return (
    <>
      {roomList.length === 0 && <List>진행 중인 채팅이 없습니다.</List>}
      {roomList &&
        roomList.map((room, index) => {
          const isExit =
            room.type === "STATUS" && +room.senderEmail === +userId;
          return (
            <Link
              to={`/chat/${room.roomId}`}
              key={`roomList${room.roomId}`}
              state={{
                backgroundLocation: location.state.backgroundLocation,
                index: index,
              }}>
              <List selected={+room.roomId === +roomId}>
                <span>
                  <Nickname>{room?.name}</Nickname>
                  <Date>{!isExit && moment(room.date).format("HH:mm")}</Date>
                </span>
                <span>
                  <Message>
                    {isExit ? "채팅 내역이 없습니다." : room?.message}
                  </Message>
                  {room?.unreadCnt > 0 && +roomId !== +room.roomId && (
                    <NotiCount>{room.unreadCnt}</NotiCount>
                  )}
                </span>
              </List>
            </Link>
          );
        })}
    </>
  );
};

const List = styled.div`
  padding: 19px 38px 19px 38px;
  color: black;
  border-bottom: 1px solid #eee;
  background-color: ${({ selected }) => (selected ? "#eee" : "white")};
  span {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;
const Nickname = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20px;
`;
const Date = styled.div`
  margin-bottom: 20px;
  color: gray;
  text-decoration: none;
`;
const Message = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #4d4d4d;
`;
const NotiCount = styled.div`
  width: fit-content;
  color: #fff;
  padding: 5px 8px 4px 8px;
  border-radius: 30px;
  font-weight: 700;
  background-color: orange;
  font-size: 12px;
`;

export default ChatRoomList;
