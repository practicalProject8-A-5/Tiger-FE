// eslint-disable-next-line

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
    <StBackground>
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
    </StBackground>
  );
};

export default LoginModal;

const StLoginModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  width: 688px;
  height: 688px;
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
  }
`;

const StBackground = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
