import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

const Toast = () => {
  return (
    <StToast className="notification toast">
      <button>X</button>
      <div className="notification-image">
        <img src="" alt="" />
      </div>
      <div>
        <p className="notification-title">Title</p>
        <p className="notification-message">Message</p>
      </div>
    </StToast>
  );
};

export default Toast;

const StToast = styled(Toast)`
  .notification-container {
    font-size: 14px;
    box-sizing: border-box;
    position: fixed;
  }
  .top-right {
    top: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: toast-in-right 0.7s;
  }

  .bottom-right {
    bottom: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: toast-in-right 0.7s;
  }

  .top-left {
    top: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: toast-in-left 0.7s;
  }

  .bottom-left {
    bottom: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: toast-in-left 0.7s;
    background-color: pink;
  }
`;
