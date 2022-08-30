// eslint-disable-next-line

import React from "react";

import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ showModal, children }) => {
  return (
    <StLoginBox>
      <div className="iconBox">
        <FaWindowClose className="icon" onClick={showModal} />
        {children}
      </div>
    </StLoginBox>
  );
};

const StLoginBox = styled.div`
  position: absolute;
  width: 700px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: rgb(225 225 255 / 13%) 0px 6px 15px 7px;
  border-radius: 30px;
  z-index: 6;
  padding: 60px 100px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  .iconBox {
    position: relative;
    width: 100%;
    height: 30px;
    .icon {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      fill: #fff;
    }
  }
`;

export default Modal;
