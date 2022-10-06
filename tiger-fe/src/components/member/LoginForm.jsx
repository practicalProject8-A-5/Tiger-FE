// eslint-disable-next-line

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __userLogin } from "../../redux/modules/memberSlice";
import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import logo from "../../assets/ta,iger_logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import kakaoLogo from "../../assets/kakaoLogin.png";

const LoginForm = ({ showModal, goRegister, loginToggle }) => {
  // 카카오로그인 redirect url
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;
  const kakaoLogin = async () => {
    window.location.href = kakaoUrl;
  };

  const eye = <FaEye />;
  const eyeHover = <FaEyeSlash />;

  const { register, handleSubmit } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(__userLogin(data)).then((result) => {
      if (result.error?.message === "Rejected") {
        toast.error("입력하신 정보를 다시 확인해주세요", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
          className: "toatst_error",
          progressClassName: "error_progress",
        });
      } else {
        showModal();
      }
    });
  };

  return (
    <StLoginForm>
      <div className="wraps">
        <AiOutlineClose className="icon" onClick={showModal} />
        <div className="login__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login__descbox">
          <div className="lineL"></div>
          <div className="text">간편 로그인/회원가입</div>
          <div className="lineR"></div>
        </div>
        <img className="kakao_logo" src={kakaoLogo} alt="kakaoLogo" />
        <div className="kakao_button" onClick={kakaoLogin}>
          카카오 로그인
        </div>
        <p>카카오 로그인시 꼭 이메일을 선택해주세요!</p>
        <div className="email" onClick={loginToggle}>
          이메일로 회원가입
        </div>

        <div className="login__descbox">
          <div className="lineL"></div>
          <div className="text">이메일 로그인</div>
          <div className="lineR"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="loginForEmail"
            required={true}
            minLength={3}
            {...register("email")}
            placeholder="아이디를 입력하세요"
          />
          <div className="password_wrapper">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="비밀번호"
              required={true}
              minLength={3}
              className="form-input"
              {...register("password")}
            />
            <i onClick={togglePasswordVisiblity}>
              {passwordShown ? eye : eyeHover}
            </i>
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
    </StLoginForm>
  );
};

const StLoginForm = styled.div`
  .wraps {
    width: 100%;
    height: 762px;
    padding: 0 94px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      font-size: 22px;
      position: absolute;
      top: 28px;
      left: 30px;
      cursor: pointer;
    }
    .login__logo {
      width: 100%;
      height: 40px;
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
    .kakao_logo {
      width: 30px;
      position: relative;
      right: 212px;
      top: 45px;
      cursor: pointer;
    }
    .kakao_button {
      width: 100%;
      height: 56px;
      border-radius: 12px;

      font-size: 18px;
      color: #4a4a4a;
      background-color: #fff115;
      text-align: center;
      font-weight: 400;
      font-size: 18px;
      line-height: 56px;
      cursor: pointer;
    }
    p {
      margin-top: 5px;
      margin-bottom: 18px;
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
      margin-bottom: 25px;
      line-height: 56px;
      color: #000;
      box-sizing: border-box;
      cursor: pointer;
    }
    form {
      width: 100%;
      .password_wrapper {
        position: relative;
        display: flex;
        margin-bottom: 14px;
        i {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 28%;
          right: 4%;
          color: #8b8b8b;
        }
        i:hover {
          cursor: pointer;
        }
      }
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
        margin-bottom: 15px;
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
        margin-bottom: 20px;
        padding: 0;
      }
    }
  }
  @media (max-width: 767px) {
    .wraps {
      padding: 0 20px;
      justify-content: unset;
      .kakao_logo {
        right: 101px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .wraps {
      justify-content: unset;
    }
  }
`;

export default LoginForm;
