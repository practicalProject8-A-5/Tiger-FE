// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import Calender from "./Calender";

const CalenderBox = ({ setIsModalOpen, vId, dateList }) => {
  return (
    <Stblur>
      <div className="background">
        <Calender
          setIsModalOpen={setIsModalOpen}
          vId={vId}
          dateList={dateList}
        />
      </div>
    </Stblur>
  );
};

const Stblur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .background {
    position: fixed;
    top: 0%;
    right: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    animation: modal-bg-show 1s;
    @keyframes modal-bg-show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

export default CalenderBox;
