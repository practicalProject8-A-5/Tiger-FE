// eslint-disable-next-line

import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import logo from "../../assets/ta,iger_logo.png";

const Login = ({ showModal, goRegister, loginToggle }) => {
  console.log(showModal);
  return (
    <StLoginForm>
      <div className="login__header">
        <AiOutlineClose className="icon" onClick={showModal} />
        <p className="login__text">로그인 또는 회원가입</p>
      </div>
      <div className="wrap">
        <div className="login__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login__descbox">
          <div className="lineL"></div>
          <div className="text">간편 로그인/회원가입</div>
          <div className="lineR"></div>
        </div>

        <div className="kakao">카카오로 간편 로그인</div>
        <div className="google">구글로 간편 로그인</div>
        <div className="email" onClick={loginToggle}>
          이메일로 회원가입
        </div>

        <div className="login__descbox">
          <div className="lineL"></div>
          <div className="text">이메일 로그인</div>
          <div className="lineR"></div>
        </div>

        <form>
          <input type="text" placeholder="이메일" className="loginForEmail" />
          <input type="password" placeholder="비밀번호" />
          <div className="find">아이디/비밀번호 찾기</div>
          <button>로그인</button>
        </form>
      </div>
    </StLoginForm>
  );
};

export default Login;

const StLoginForm = styled.div`
  /* background-color: skyblue; */
  .login__header {
    width: 100%;
    height: 78px;
    /* background-color: pink; */
    position: relative;
    color: #000;
    border-bottom: 1px solid #f2f2f2;
    .icon {
      font-size: 22px;
      position: absolute;
      top: 28px;
      left: 30px;
      cursor: pointer;
    }
    .login__text {
      font-weight: 600;
      font-size: 18px;
      text-align: center;
      line-height: 78px;
    }
  }
  .wrap {
    width: 100%;
    height: 762px;
    padding: 0 94px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: skyblue; */
    /* justify-content: center; */
    .login__logo {
      width: 100%;
      height: 40px;
      /* background-color: pink; */
      text-align: center;
      margin: 36px 0 40px 0;
      img {
        width: 121px;
        height: 100%;
        object-fit: cover;
      }
    }
    .login__descbox {
      width: 100%;
      height: 22px;
      text-align: center;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .lineL {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
      .text {
        font-weight: 400;
        font-size: 16px;
        color: #8b8b8b;
        margin: 0 14px;
      }
      .lineR {
        width: 164px;
        height: 1px;
        background-color: #8b8b8b;
      }
    }
    .kakao {
      width: 100%;
      height: 56px;
      background: #feea33;
      font-weight: 400;
      font-size: 18px;
      color: #000;
      text-align: center;
      margin-bottom: 18px;
      line-height: 56px;
      cursor: pointer;
    }
    .google {
      width: 100%;
      height: 56px;
      background: #ffffff;
      font-weight: 400;
      font-size: 18px;
      border: 1px solid #000000;
      text-align: center;
      margin-bottom: 18px;
      line-height: 56px;
      color: #000;
      box-sizing: border-box;
      cursor: pointer;
    }
    .email {
      width: 100%;
      height: 56px;
      background: #ffffff;
      font-weight: 400;
      font-size: 18px;
      border: 2px solid #cccccc;
      text-align: center;
      margin-bottom: 40px;
      line-height: 56px;
      color: #000;
      box-sizing: border-box;
      cursor: pointer;
    }
    form {
      width: 100%;
      input {
        display: block;
        width: 100%;
        height: 56px;
        outline: none;
        padding: 15px 24px;
        box-sizing: border-box;
        background: #ffffff;
        border: 2px solid #cccccc;
        border-radius: 12px;
        margin-bottom: 18px;
        font-weight: 400;
        font-size: 18px;
        color: #8b8b8b;
        :nth-last-child() {
          margin-bottom: 14px;
        }
      }
      .find {
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #8b8b8b;
        text-align: right;
        margin-bottom: 52px;
      }
      button {
        width: 100%;
        height: 56px;
        background: #ff881b;
        color: #ffffff;
        font-weight: 600;
        font-size: 18px;
        border: none;
        cursor: pointer;
        margin-bottom: 48px;
        padding: 0;
      }
    }
  }
`;
