// eslint-disable-next-line

import React from "react";

import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/ta,iger_logo.png";

import { useState } from "react";

const Header = ({ ownerMode }) => {
  const [inOwner, setInOwner] = useState(false);
  const navigate = useNavigate();
  const onClick = () => {
    if (ownerToggle !== null) {
      setInOwner((prev) => !prev);
      setTimeout(() => {
        navigate("/owner");
      }, 1000);
    } else {
      setInOwner((prev) => !prev);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
  console.log(inOwner);

  const ownerToggle = useMatch(`/`);
  console.log(ownerToggle);

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
            <Link to="/intro" style={{ textDecoration: "none" }}>
              <div className="header__home">홈</div>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="header__main">24렌트</div>
            </Link>
            <Link to="/renter" style={{ textDecoration: "none" }}>
              <div className="header__mypage">마이페이지</div>
            </Link>
          </div>
          <div className="header__menu__R">
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
            <div className="header__login">로그인</div>
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
        }
        .header__mypage {
          width: 92px;
          height: 23px;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          cursor: pointer;
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
              border: 1px solid;
              transition: all 0.5s;
            }
          }
        }
        .header__login {
          width: 56px;
          height: 23px;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          color: #ff881b;
          margin-left: 50px;
          cursor: pointer;
        }
      }
    }
  }
`;
