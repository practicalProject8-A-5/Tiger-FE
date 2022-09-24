// eslint-disable-next-line

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useMatch, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/ta,iger_logo.png";
import axios from "axios";
import { loader } from "../redux/modules/memberSlice";
import LoginBox from "./LoginBox";
import { setNotification } from "../redux/modules/chatSlice";
import { cleanUpRoomList } from "../redux/modules/chatSlice";

const Header = ({ ownerMode }) => {
  const memberApi = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();
  const location = useLocation();

  const notification = useSelector((state) => state.chatSlice.notification);
  console.log("notification :", notification);

  const [IsModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(!IsModalOpen);
  };
  // console.log("현재 :", IsModalOpen);

  const [inOwner, setInOwner] = useState(false);

  const ownerToggle = useMatch("/*");
  // const ownerToggle = useMatch("/");
  // console.log(ownerToggle);
  // console.log(inOwner);
  const onClick = () => {
    if (ownerToggle !== null) {
      setInOwner(!inOwner);
      setTimeout(() => {
        navigate("/owner");
      }, 1000);
    } else {
      setInOwner(!inOwner);
      setTimeout(() => {
        navigate("/*");
      }, 1000);
    }
  };
  // console.log(inOwner);

  // 로그인 여부
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.memberSlice.userInfo);
  // console.log(userInfo);

  // 로그아웃 delete 호출
  const __userLogout = async () => {
    const confirm = window.confirm("Are you Sure?");
    if (confirm === true) {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      // console.log(refreshToken);
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      axios.delete(`${memberApi}/member/logout`, {
        headers: headers,
      });
      window.localStorage.clear();
      dispatch(cleanUpRoomList());
      dispatch(loader());
    } else if (confirm === false) {
      return;
    }
  };

  // 로그인 드랍메뉴
  const [isDropDown, setIsDropDown] = useState(false);
  const openDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  // 메뉴바 글씨 클릭시 색상 변환 유지
  const [textColor, setTextColor] = useState("black");
  const handleChnageTextColor = (e) => {
    setTextColor(textColor === "black" ? "#CCCCCC" : "black");
  };

  return (
    <StHeader>
      <div className="wrap">
        <div className="header__logo">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="로고" />
          </Link>
        </div>

        <div className="header__menu">
          <div className="header__menu__L">
            <Link
              to="/home"
              style={{ textDecoration: "none", color: textColor }}
              onClick={handleChnageTextColor}
            >
              <div className="header__home">홈</div>
            </Link>
            <Link
              to="/"
              style={{ textDecoration: "none", color: textColor }}
              onClick={handleChnageTextColor}
            >
              <div className="header__main">24렌트</div>
            </Link>
            {userInfo.name ? (
              <Link
                to="/renter"
                style={{ textDecoration: "none", color: textColor }}
                onClick={handleChnageTextColor}
              >
                <div className="header__mypage">마이페이지</div>
              </Link>
            ) : (
              <Link
                to="/renter"
                style={{ textDecoration: "none", display: "none" }}
              >
                <div className="header__mypage">마이페이지</div>
              </Link>
            )}
          </div>
          <div className="header__menu__R">
            {userInfo.name ? (
              <div className="header__switch">
                <span className="text">오너모드로 전환</span>
                {!inOwner ? (
                  <label className="switch">
                    <input id="switch" type="checkbox" onClick={onClick} />
                    <span className="slider"></span>
                  </label>
                ) : (
                  <label
                    className="switch"
                    style={{ backgroundColor: "#ff881b" }}
                  >
                    <input id="switch" type="checkbox" onClick={onClick} />
                    <span className="slider"></span>
                  </label>
                )}
              </div>
            ) : (
              <div className="header__switch" style={{ display: "none" }}>
                <span className="text">오너모드로 전환</span>
                {!inOwner ? (
                  <label className="switch">
                    <input id="switch" type="checkbox" onClick={onClick} />
                    <span className="slider"></span>
                  </label>
                ) : (
                  <label
                    className="switch"
                    style={{ backgroundColor: "#ff881b" }}
                  >
                    <input id="switch" type="checkbox" onClick={onClick} />
                    <span className="slider"></span>
                  </label>
                )}
              </div>
            )}

            {userInfo.name ? (
              <>
                <div className="header__loggedin" onClick={openDropDown}>
                  <img src={userInfo.profileImage} alt="profileImage" />
                  <div className="header__loggedin__text">
                    <span>반갑습니다!</span>
                    <span>{userInfo.name}님</span>
                    {notification && <NewNoti />}
                  </div>
                  {isDropDown && (
                    <ul>
                      <Link
                        to="/chat"
                        state={{ backgroundLocation: location }}
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        {/* {notification && <NewNoti />} */}
                        <li>메세지</li>
                      </Link>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to="/owner"
                      >
                        <li>오너페이지</li>
                      </Link>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to="/renter"
                      >
                        <li>마이페이지</li>
                      </Link>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to="/home"
                      >
                        <li>도움말</li>
                      </Link>
                      <li onClick={__userLogout}>로그아웃</li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="header__login" onClick={showModal}>
                로그인
              </div>
            )}
            {IsModalOpen && (
              <LoginBox showModal={showModal} IsModalOpen={IsModalOpen} />
            )}
          </div>
        </div>
      </div>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 112px;
  padding: 0 246px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  /* background-color: pink; */
  .wrap {
    width: 100%;
    height: 40px;
    display: flex;
    /* background-color: pink; */
    .header__logo {
      width: 121px;
      height: 40px;
      margin-right: 126px;
      /* background-color: skyblue; */
      /* cursor: pointer; */
      img {
        cursor: pointer;
      }
    }
    .header__menu {
      width: calc(1411px - 247px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header__menu__L {
        height: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
        .header__home {
          font-size: 20px;
          font-weight: 500;
          line-height: 23px;
          margin-right: 44px;
          cursor: pointer;
          color: black;
        }
        .header__main {
          width: 65px;
          height: 23px;
          color: #ff881b;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          margin-right: 44px;
          cursor: pointer;
          color: black;
        }
        .header__mypage {
          width: 92px;
          height: 23px;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          cursor: pointer;
          color: black;
        }
      }
      .header__menu__R {
        display: flex;
        justify-content: center;
        align-items: center;
        .header__switch {
          display: flex;
          align-items: center;
          height: 20.5px;
          .text {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #8b8b8b;
            margin-right: 12px;
          }
          label {
            width: 34px;
            height: 14px;
            position: relative;
            background: rgba(33, 33, 33, 0.08);
            border-radius: 7px;
            transition: all 0.5s;
            /* background-color: pink;/ */
            cursor: pointer;
            input {
              display: none;
              :checked + .slider {
                background-color: #ff881b;
                transform: translateX(15px);
              }
            }
            .slider {
              position: absolute;
              top: -4px;
              left: 0;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: #fff;
              /* border: 1px solid #ddd; */
              transition: all 0.5s;
              box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
            }
          }
        }
        .header__login {
          width: 102px;
          height: 40px;
          opacity: 0.98;
          border: 2px solid #f2f2f2;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
          border-radius: 20px;
          font-style: normal;
          font-weight: 500;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }
        .header__loggedin {
          margin-left: 40px;
          height: 40px;
          opacity: 0.98;
          border: 2px solid #f2f2f2;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
          border-radius: 20px;
          font-style: normal;
          font-weight: 500;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          z-index: 9;
          position: relative;
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            position: absolute;
            top: 50px;
            width: 212px;
            overflow: hidden;
            right: 0px;
            box-shadow: 0px -2px 80px rgba(0, 0, 0, 0.04),
              0px -0.6px 30px rgba(0, 0, 0, 0.04),
              0px -0.375647px 17.7806px rgba(0, 0, 0, 0.04),
              0px -0.1px 6.4309px rgba(0, 0, 0, 0.02);
            border-radius: 12px;
            background: #fff;
          }
          li {
            font-weight: 400;
            font-size: 14px;
            height: 42px;
            line-height: 42px;
            display: block;
            text-align: center;
            border-top: 1px solid #eee;
            :nth-last-child(5) {
              border-top: none;
            }
          }
          li:hover {
            background-color: rgba(0, 0, 0, 0.14);
            cursor: pointer;
          }
          .header__loggedin__text {
            display: flex;
            flex-direction: column;
            float: right;
            margin-top: 6px;
            margin-right: 10px;
            margin-left: 6px;
          }
          span {
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            line-height: 14px;
          }
          img {
            width: 30px;
            height: 30px;
            float: left;
            margin-top: 5px;
            margin-left: 7px;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;

const NewNoti = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  position: relative;
  left: -15px;
  bottom: 31px;
  background-color: #eb3434;
  @media screen and (max-width: 768px) {
    right: 2px;
    bottom: 40px;
  }
  /* &:before {
    position: absolute;
    left: 0;
    top: -10%;
    width: 100%;
    height: 120%;
    background: red;
    filter: blur(5px);
    content: "";
    opacity: 0;
    animation: flash 0.9s ease-out alternate infinite;
  } */
  @keyframes flash {
    to {
      opacity: 1;
    }
  }
`;
