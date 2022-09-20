import React from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";

const LoginBox = ({ showModal }) => {
  return (
    <Stblur>
      <div className="bg">
        <LoginModal />
      </div>
    </Stblur>
  );
};

export default LoginBox;

const Stblur = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    animation: modal-bg-show 1s;
    @keyframes modal-bg-show {
      from {
        transform: translateY(-50%);
        opacity: 0;
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;
