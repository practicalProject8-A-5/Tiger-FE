import React from "react";
import styled from "styled-components";
import LoginForm from "../components/member/LoginForm";

const LoginModal = ({ showModal }) => {
  console.log(showModal);
  return (
    <StLoginModal>
      <LoginForm showModal={showModal} />
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
