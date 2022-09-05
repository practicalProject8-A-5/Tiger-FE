// eslint-disable-next-line

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { __registerUser } from "../../redux/modules/memberSlice";

import styled from "styled-components";
import { BiChevronLeft } from "react-icons/bi";

import { useForm } from "react-hook-form";

const RegisterForm = ({ showModal, loginToggle, setGoRegister }) => {
  const { isLoading, userInfo, success, result } = useSelector(
    (state) => state.memberSlice
  );

  console.log(userInfo);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // redirect authenticated user to home
  //   if (userInfo) navigate("/");
  //   console.log(userInfo);
  //   // redirect user to login page if registration was successful
  //   if (success) navigate("/login");
  //   console.log(success);
  // }, [navigate, userInfo, success, result]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // { mode: "onChange" }

  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const regExgPw = /^(?=.*\d)(?=.*[zA-ZS]).{8,}/;

  // 회원가입 submit 요청
  const onSubmit = (data) => {
    dispatch(__registerUser(data));
    console.log(data);
    console.log("눌림");
    // setGoRegister(!loginToggle);
  };

  return (
    <StRegisterForm>
      <div className="login__header">
        <BiChevronLeft className="icon" onClick={showModal} />
        <p className="login__text">이메일로 회원가입</p>
      </div>
      <form className="Register_wrap" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <div className="formbox">
          <label htmlFor="email" className="Register__label">
            <span className="import">*</span>이메일
          </label>
          {errors.email ? (
            <input
              style={{ border: " 2px solid #EB3434" }}
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요."
              className="Register__input"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: regExpEm,
                  message: "이메일 형식이 아닙니다.",
                },
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          ) : (
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요."
              className="Register__input"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: regExpEm,
                  message: "이메일 형식이 아닙니다.",
                },
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          )}
          {errors.email ? (
            <div className="error">{errors.email.message}</div>
          ) : null}
        </div>

        {/* 비밀번호 */}
        <div className="formbox__pw">
          <label htmlFor="password" className="Register__label">
            <span className="import">*</span>비밀번호
          </label>
          {errors.password ? (
            <input
              style={{ border: "2px solid #EB3434" }}
              type="password"
              id="pw"
              placeholder="비밀번호 (영문+숫자+특수문자 8자 이상)"
              className="Register__input"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이여야 합니다,",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하로 사용가능합니다.",
                },
                pattern: {
                  value: /^[A-Za-z0-9]{6,12}$/,
                  message:
                    "비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로 입력해 주세요.",
                },
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          ) : (
            <input
              type="password"
              id="password"
              placeholder="비밀번호 (영문+숫자+특수문자 8자 이상)"
              className="Register__input"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이여야 합니다,",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하로 사용가능합니다.",
                },
                pattern: {
                  value: regExgPw,
                  message:
                    "비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로 입력해 주세요.",
                },
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          )}
          {errors.password ? (
            <div className="error">{errors.password.message}</div>
          ) : null}

          {/* 비밀번호 체크 */}
          {errors.passwordConfirm ? (
            <input
              style={{ border: " 2px solid #EB3434" }}
              type="password"
              id="passwordConfirm"
              placeholder="비밀번호 확인"
              className="Register__input__ck"
              {...register("passwordConfirm", {
                required: "비밀번호 불일치",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이여야 합니다,",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하로 사용가능합니다.",
                },
                pattern: {
                  value: regExgPw,
                  message:
                    "비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로 입력해 주세요.",
                },
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          ) : (
            <input
              type="password"
              id="passwordConfirm"
              placeholder="비밀번호 확인"
              className="Register__input__ck"
              {...register("passwordConfirm", {
                required: "비밀번호 불일치",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이여야 합니다,",
                },
                maxLength: {
                  value: 16,
                  message: "16자 이하로 사용가능합니다.",
                },
                pattern: {
                  value: regExgPw,
                  message:
                    "비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로 입력해 주세요.",
                },
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          )}
          {errors.passwordConfirm ? (
            <div className="error">{errors.passwordConfirm.message}</div>
          ) : null}
        </div>

        {/* 이름 */}
        <div className="formbox">
          <label htmlFor="name" className="Register__label">
            <span className="import">*</span>이름
          </label>
          {errors.name ? (
            <input
              style={{ border: " 2px solid #EB3434" }}
              type="text"
              id="name"
              placeholder="이름을 입력해주세요."
              className="Register__input"
              {...register("name", {
                required: "이름을 입력해주세요.",
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          ) : (
            <input
              type="text"
              id="name"
              placeholder="이름을 입력해주세요."
              className="Register__input"
              {...register("name", {
                required: "이름을 입력해주세요.",
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          )}
          {errors.name ? (
            <div className="error">{errors.name.message}</div>
          ) : null}
        </div>

        {/* 전화번호 */}
        {/* <div className="formbox">
          <label htmlFor="phone" className="Register__label">
            <span className="import">*</span>전화번호
          </label>
          {errors.phone ? (
            <input
              style={{ border: " 2px solid #EB3434" }}
              type="text"
              id="phone"
              placeholder="전화번호를 입력해주세요."
              className="Register__input"
              {...register("phone", {
                required: "전화번호를 입력해주세요.",
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          ) : (
            <input
              type="text"
              id="phone"
              placeholder="전화번호를 입력해주세요."
              className="Register__input"
              {...register("phone", {
                required: "전화번호를 입력해주세요.",
                // validate: {
                //   type: (value) =>
                //     emailCheck(value) ||
                //     "You should write in proper email format.",
                // },
              })}
            />
          )}
          {errors.phone ? (
            <div className="error">{errors.phone.message}</div>
          ) : null}
        </div> */}
        <button type="submit" disabled={isLoading}>
          회원가입
        </button>
      </form>
    </StRegisterForm>
  );
};

const StRegisterForm = styled.div`
  /* background-color: pink; */
  .login__header {
    width: 100%;
    height: 78px;
    /* background-color: pink; */
    position: relative;
    color: #000;
    border-bottom: 1px solid #f2f2f2;
    /* margin-bottom: 36px; */
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
      /* background-color: yellow; */
    }
  }
  .Register_wrap {
    width: 100%;
    height: 762px;
    padding: 30px 94px 30px 94px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: skyblue; */
    /* margin-top: 36px; */
    .formbox {
      width: 100%;
      height: 98px;
      /* background-color: pink; */
      font-weight: 400;
      font-size: 18px;
      color: #8b8b8b;
      margin-bottom: 37px;
      .import {
        color: #ff881b;
        /* line-height: 25px; */
        margin-right: 5px;
      }
      .Register__label {
        display: block;
        width: 100%;
        height: 25px;
        margin-bottom: 14px;
        /* background-color: skyblue; */
      }
      .Register__input {
        width: 100%;
        height: 56px;
        border: 2px solid #cccccc;
        outline: none;
        padding: 17px 24px;
        box-sizing: border-box;
        font-weight: 500;
        font-size: 16px;
        color: #8b8b8b;
        font-family: "Noto Sans KR", sans-serif;
      }
      .error {
        width: 100%;
        height: 22px;
        margin-top: 7px;
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-align: right;
        /* background-color: pink; */
      }
    }
    .formbox__pw {
      width: 100%;
      height: 190px;
      /* background-color: pink; */
      font-weight: 400;
      font-size: 18px;
      color: #8b8b8b;
      margin-bottom: 37px;
      .import {
        height: 100%;
        font-weight: 400;
        font-size: 18px;
        color: #ff881b;
        margin-right: 5px;
        /* background-color: pink; */
      }
      .Register__label {
        display: block;
        width: 100%;
        height: 25px;
        /* background-color: skyblue; */
        margin-bottom: 14px;
      }
      .Register__input {
        width: 100%;
        height: 56px;
        border: 2px solid #cccccc;
        outline: none;
        padding: 17px 24px;
        box-sizing: border-box;
        font-weight: 500;
        font-size: 16px;
        color: #8b8b8b;
        font-family: "Noto Sans KR", sans-serif;
        /* margin-bottom: 14px; */
      }
      .Register__input__ck {
        width: 100%;
        height: 56px;
        border: 2px solid #cccccc;
        outline: none;
        padding: 17px 24px;
        box-sizing: border-box;
        font-weight: 500;
        font-size: 16px;
        color: #8b8b8b;
        margin-top: 14px;
        font-family: "Noto Sans KR", sans-serif;
      }
      .error {
        width: 100%;
        /* height: 22px; */
        margin-top: 7px;
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-align: right;
        /* background-color: pink; */
      }
    }
    button {
      width: 100%;
      height: 56px;
      background: #ff881b;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      border: none;
      padding: 0;
      margin-top: 8px;
      cursor: pointer;
    }
  }
`;

export default RegisterForm;
