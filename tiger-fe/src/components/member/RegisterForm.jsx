// eslint-disable-next-line

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __registerUser } from "../../redux/modules/memberSlice";
import styled from "styled-components";
import { BiChevronLeft } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = ({
  showModal,
  loginToggle,
  setGoRegister,
  goRegister,
}) => {
  const dispatch = useDispatch();
  const serverApi = process.env.REACT_APP_SERVER;

  const eye = <FaEye />;
  const eyeHover = <FaEyeSlash />;

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordConfirmVisiblity = () => {
    setPasswordConfirmShown(passwordConfirmShown ? false : true);
  };

  // use Form Hook
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // { mode: "onChange" }

  // email and pw validation
  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExgPw = /^(?=.*\d)(?=.*[zA-ZS]).{8,}/;

  // 이메일 중복확인
  const [checkEmail, setCheckEmail] = useState("");
  const handleChange = (e) => {
    const checkEmail = e.target.value;
    setCheckEmail(checkEmail);
  };
  const [clickCheckEmail, setClickCheckEmail] = useState(false);
  const emailCheck = async (e) => {
    console.log("ll");
    e.preventDefault();
    // e.stopPropagation();
    setClickCheckEmail(true);
    // const checkEmailServer = checkEmail;
    const headers = {
      "Content-Type": "application/json",
    };
    // console.log(checkEmail);
    try {
      const response = await axios.post(
        `${serverApi}/member/emailCheck`,
        { email: checkEmail },
        {
          headers: headers,
        }
      );
      if (response.data.result === true && checkEmail !== "") {
        // 백엔드로 보낸 데이터 결과 200 일 경우
        toast.success("사용 가능한 아이디 입니다.", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_RIGHT,
          className: "toatst_success",
          progressClassName: "success_progress",
        });
        setCheckEmail(!checkEmail); //사용 가능한 아이디 일 경우 state상태에 true값으로 변경, 나중에 회원가입 버튼 클릭 이벤트핸들러에 필요!
      } else if (response.data.result === false) {
        toast.warn("이미 사용중인 아이디 입니다.", {
          theme: "dark",
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
          className: "toatst_warn",
          progressClassName: "warn_progress",
        }); // 이미 데이터베이스에 있는 아이디일 경우 409
        // alert("이미 사용중");
        setCheckEmail("");
      } else {
        // alert("사용 불가");
        // 그 외에는 사용 불가한 아이디
        toast.error("사용 불가한 아이디입니다.", {
          theme: "dark",
          autoClose: 3000000,
          position: toast.POSITION.TOP_CENTER,
          className: "toatst_error",
          progressClassName: "error_progress",
        });
      }
      // console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  };

  // 회원가입 submit 요청

  const onSubmit = (data) => {
    // data.preventDefault();
    // data.stopPropagation();

    if (clickCheckEmail === false) {
      toast.warn("이메일 중복확인 해주세요.", {
        theme: "dark",
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
        className: "toatst_warn",
        progressClassName: "warn_progress",
      });
      // alert("중복확인 해주세요");
    } else {
      dispatch(__registerUser(data));
      loginToggle();
    }
  };

  return (
    <StRegisterForm>
      <div className="login__header">
        <BiChevronLeft className="icon" onClick={loginToggle} />
        <p className="login__text">이메일로 회원가입</p>
      </div>
      <form className="Register_wrap" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <div className="formbox">
          <label htmlFor="email" className="Register__label">
            <span className="import">*</span>이메일
          </label>
          {errors.email ? (
            <>
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
                onChange={handleChange}
              ></input>
              <div className="Register__emailCheck" onClick={emailCheck}>
                중복확인
              </div>
            </>
          ) : (
            <>
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
                onChange={handleChange}
              />
              <div className="Register__emailCheck" onClick={emailCheck}>
                중복확인
              </div>
              {/* <StyledContainer /> */}
            </>
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
            <div className="password_wrapper">
              <input
                style={{ border: "2px solid #EB3434" }}
                type={passwordShown ? "text" : "password"}
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
                    value: regExgPw,
                    message:
                      "비밀번호는 영문(대/소문자 구분), 숫자 조합하여 8~12자리로 입력해 주세요.",
                  },
                })}
              />
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? eye : eyeHover}
              </i>
            </div>
          ) : (
            <div className="password_wrapper">
              <input
                type={passwordShown ? "text" : "password"}
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
                })}
              />
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? eye : eyeHover}
              </i>
            </div>
          )}
          {errors.password ? (
            <div className="error">{errors.password.message}</div>
          ) : null}

          {/* 비밀번호 체크 */}
          {errors.passwordConfirm ? (
            <div className="password_wrapper">
              <input
                style={{ border: " 2px solid #EB3434" }}
                type={passwordConfirmShown ? "text" : "password"}
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
                      "비밀번호는 영문(대/소문자 구분), 숫자 조합하여 8~12자리로 입력해 주세요.",
                  },
                })}
              />
              <i className="eyeIcon" onClick={togglePasswordConfirmVisiblity}>
                {passwordConfirmShown ? eye : eyeHover}
              </i>
            </div>
          ) : (
            <div className="password_wrapper">
              <input
                type={passwordConfirmShown ? "text" : "password"}
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
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                })}
              />
              <i className="eyeIcon" onClick={togglePasswordConfirmVisiblity}>
                {passwordConfirmShown ? eye : eyeHover}
              </i>
            </div>
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
        <button type="submit">회원가입</button>
      </form>
      {/* <StyledContainer /> */}
    </StRegisterForm>
  );
};

const StRegisterForm = styled.div`
  .login__header {
    width: 100%;
    height: 78px;
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
  .Register_wrap {
    width: 100%;
    height: 762px;
    padding: 30px 94px 30px 94px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .formbox {
      width: 100%;
      height: 98px;
      font-weight: 400;
      font-size: 18px;
      color: #8b8b8b;
      margin-bottom: 37px;
      .import {
        color: #ff881b;
        margin-right: 5px;
      }
      .Register__label {
        display: block;
        width: 100%;
        height: 25px;
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
      }
      .Register__emailCheck {
        float: right;
        cursor: pointer;
        border: 1px solid #cccccc;
        padding: 7px;
        height: 20px;
        line-height: 20px;
        margin-top: 5px;
        border-radius: 3px;
        font-size: 13px;
        background-color: #ff881b;
        color: white;
      }
      .error {
        width: 100%;
        height: 22px;
        margin-top: 7px;
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-align: right;
      }
    }
    .formbox__pw {
      width: 100%;
      height: 190px;
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
      }
      .Register__label {
        display: block;
        width: 100%;
        height: 25px;
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
      .password_wrapper {
        position: relative;
        display: flex;
        margin-bottom: 14px;
        .eyeIcon {
          position: absolute;
          top: 46%;
          right: 4%;
          color: #8b8b8b;
        }
        .eyeIcon:hover {
          cursor: pointer;
        }
        i {
          position: absolute;
          top: 28%;
          right: 4%;
          color: #8b8b8b;
        }
        i:hover {
          cursor: pointer;
        }
      }
      .error {
        width: 100%;
        margin-top: 7px;
        font-weight: 500;
        font-size: 14px;
        color: #eb3434;
        text-align: right;
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
const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    position: relative;
  }
  .Toastify__toast-body {
    height: 100px;
    .Toastify__toast-icon > svg {
      fill: #fff;
    }
  }
  .Toastify__progress-bar {
  }
  .Toastify__close-button {
    background-color: pink;
    border-radius: 12px;
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    margin: 0;
  }
`;
export default RegisterForm;
