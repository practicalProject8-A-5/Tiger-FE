// eslint-disable-next-line

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const OwnerInfo = () => {
  const memberInfo = useSelector((state) => state.memberSlice.userInfo);

  const navigate = useNavigate("");
  const toForm = () => {
    navigate("/form");
  };

  return (
    <StOwnerInfo>
      <div className="userProfile">
        <div className="profile__top">
          <div className="userimg">
            <img
              src={memberInfo.profileImage}
              alt="profileImage"
              loading="lazy"
            />
          </div>
          <div className="userMiniProfile">
            <div className="userMiniProfile__top">
              <h3>{memberInfo.name}님</h3>
              <div className="bash">오너</div>
            </div>
            <div className="userEmail">{memberInfo.email}</div>
          </div>
        </div>

        <div className="profileTitle">오너 네임</div>
        <div className="profileValue">{memberInfo.name}</div>

        <div className="profileTitle">오너 전화번호</div>
        <div className="profileValue">{memberInfo.phone || memberInfo.tel}</div>

        <div className="profileTitle">오너 연락 메일 주소</div>
        <div className="profileValue">{memberInfo.email}</div>
        <div className="createBtn" onClick={toForm}>
          차량 등록
        </div>
      </div>
    </StOwnerInfo>
  );
};

export default OwnerInfo;

const StOwnerInfo = styled.div`
  position: sticky;
  /* z-index: 8; */
  top: 255px;
  width: 42%;
  /* width: 42%; */
  height: 550px;
  display: flex;
  justify-content: center;
  padding: 57px 59px 50px 59px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  box-shadow: 0px -3px 100px rgba(0, 0, 0, 0.07),
    0px -0.904412px 42.8088px rgba(0, 0, 0, 0.0456112),
    0px -0.375647px 17.7806px rgba(0, 0, 0, 0.035),
    0px -0.135864px 6.4309px rgba(0, 0, 0, 0.0243888);
  border-radius: 12px;
  /* background-color: tomato; */
  .userProfile {
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    position: relative;
    .profile__top {
      width: 100%;
      height: 100%;
      display: flex;
      margin-bottom: 40px;
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
      margin-bottom: 34px;
      border-bottom: 1px solid #000;
      line-height: 36px;
      font-weight: 600;
    }
    .createBtn {
      width: 100%;
      height: 60px;
      border: 2px solid #ff881b;
      border-radius: 12px;
      text-align: center;
      line-height: 60px;
      color: #ff881b;
      /* padding: 10px 22px; */
      box-sizing: border-box;
      /* background: #d9d9d9; */
      border-radius: 16px;
      cursor: pointer;
      font-weight: 600;
      font-size: 20px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    position: fixed;
    bottom: 150px;
    right: 5%;
    width: auto;
    height: 60px;
    padding: 0;
    border: none;
    /* background-color: pink; */
    .userProfile {
      width: 100%;
      height: 100%;
      .profile__top {
        display: none;
        .userimg img {
          display: none;
        }
        .userMiniProfile {
          .userMiniProfile__top {
            display: none;
            h3 {
              display: none;
            }
            .bash {
              display: none;
            }
          }
          .userEmail {
            display: none;
          }
        }
      }
      .profileTitle {
        display: none;
      }
      .profileValue {
        display: none;
      }
      .createBtn {
        width: 70px;
        height: 60px;
        color: #ff881b;
        font-size: 15px;
      }
    }
  }
  @media (max-width: 767px) {
    position: absolute;
    top: -1%;
    width: 90%;
    height: 60px;
    padding: 0;
    border: none;
    .userProfile {
      width: 100%;
      height: 100%;
      .profile__top {
        display: none;
        .userimg img {
          display: none;
        }
        .userMiniProfile {
          .userMiniProfile__top {
            display: none;
            h3 {
              display: none;
            }
            .bash {
              display: none;
            }
          }
          .userEmail {
            display: none;
          }
        }
      }
      .profileTitle {
        display: none;
      }
      .profileValue {
        display: none;
      }
      .createBtn {
        width: 100%;
        height: 60px;
        color: #ff881b;
        font-size: 15px;
      }
    }
  }
`;
