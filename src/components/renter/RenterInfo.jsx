// eslint-disable-next-line

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const RenterInfo = () => {
  const memberInfo = useSelector((state) => state.memberSlice.userInfo);
  // console.log(memberInfo);

  return (
    <StRenterInfo>
      <div className="userProfile">
        <div className="profile__top">
          <div className="userimg">
            <img src={memberInfo.profileImage} alt="profileImage" />
          </div>
          <div className="userMiniProfile">
            <div className="userMiniProfile__top">
              <h3>{memberInfo.name}님</h3>
              <div className="bash">렌터</div>
            </div>
            <div className="userEmail">{memberInfo.email}</div>
          </div>
        </div>

        <div className="profileTitle">렌터 네임</div>
        <div className="profileValue">{memberInfo.name}</div>

        <div className="profileTitle">렌터 전화번호</div>
        <div className="profileValue">{memberInfo.phone || memberInfo.tel}</div>

        <div className="profileTitle">렌터 연락 메일 주소</div>
        <div className="profileValue">{memberInfo.email}</div>
      </div>
    </StRenterInfo>
  );
};

const StRenterInfo = styled.div`
  position: fixed;
  /* z-index: 9; */
  top: 261px;
  right: 259px;
  width: 520px;
  height: 550px;
  display: flex;
  justify-content: center;
  padding: 57px 59px 78px 59px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  box-shadow: 0px -3px 100px rgba(0, 0, 0, 0.07),
    0px -0.904412px 42.8088px rgba(0, 0, 0, 0.0456112),
    0px -0.375647px 17.7806px rgba(0, 0, 0, 0.035),
    0px -0.135864px 6.4309px rgba(0, 0, 0, 0.0243888);
  border-radius: 12px;
  /* background-color: tomato; */
  .userProfile {
    width: 400px;
    height: 56px;
    /* background-color: pink; */
    box-sizing: border-box;
    position: relative;
    .profile__top {
      width: 100%;
      height: 100%;
      display: flex;
      margin-bottom: 60px;
      .userimg img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #d9d9d9;
        margin-right: 17px;
      }
      .userMiniProfile {
        .userMiniProfile__top {
          display: flex;
          margin-bottom: 9px;
          h3 {
            font-weight: 700;
            font-size: 18px;
            color: #000;
            margin-right: 14px;
          }
          .bash {
            border-radius: 20px;
            background: #ffb979;
            width: 34px;
            height: 20px;
            font-weight: 600;
            font-size: 10px;
            color: #000;
            text-align: center;
            line-height: 20px;
          }
        }
        .userEmail {
          font-weight: 500;
          font-size: 18px;
          color: #8b8b8b;
        }
      }
    }
    .profileTitle {
      width: 100%;
      height: 25px;
      /* background-color: yellowgreen; */
      font-weight: 500;
      font-size: 18px;
      color: #000;
    }
    .profileValue {
      width: 100%;
      height: 34px;
      /* background-color: royalblue; */
      margin-bottom: 51px;
      border-bottom: 1px solid #000;
      line-height: 36px;
      font-weight: 600;
    }
  }
`;

export default RenterInfo;
