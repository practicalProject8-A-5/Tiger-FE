import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/member/LoginForm";
import RegisterForm from "../components/member/RegisterForm";

const LoginModal = ({ showModal }) => {
  const [goRegister, setGoRegister] = useState(false);
  // console.log(showModal);

  const loginToggle = () => {
    setGoRegister(!goRegister);
  };

  return (
    <StLoginModal>
      {goRegister === false ? (
        <LoginForm
          showModal={showModal}
          goRegister={goRegister}
          loginToggle={loginToggle}
        />
      ) : (
        <RegisterForm
          showModal={showModal}
          goRegister={goRegister}
          setGoRegister={setGoRegister}
          loginToggle={loginToggle}
        />
      )}
    </StLoginModal>
  );
};

export default LoginModal;

const StLoginModal = styled.div`
  position: absolute;
  top: 57%;
  right: 0;
  transform: translate(-50%, -50%);
  z-index: 9;
  width: 688px;
  height: 840px;
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
`;
