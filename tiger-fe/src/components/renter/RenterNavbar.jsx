// eslint-disable-next-line

import React from "react";

import styled, { css } from "styled-components";

const RenterNavbar = () => {
  return (
    <StNavBar>
      <div className="wrap">
        <Category>
          <div>예약차량</div>
          <div>사용중 차량</div>
          <div>렌트내역</div>
          <div>환불</div>
        </Category>
      </div>
    </StNavBar>
  );
};

const StNavBar = styled.div`
  width: 100%;
  height: 93px;
  background: #ffffff;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06),
    0px 10px 12px rgba(0, 0, 0, 0.0456112),
    0px 12.5216px 10px rgba(0, 0, 0, 0.02);
  /* background-color: skyblue; */
  padding: 0 246px;
  box-sizing: border-box;
  .wrap {
    display: flex;
    align-items: center;
    height: 100%;
    /* background-color: pink; */
    /* .category {
      font-weight: 600;
      font-size: 20px;
      color: #8b8b8b;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      margin-left: 70px;
      :nth-child(1) {
        margin: 0;
      }
      :hover {
        color: #585656;
      }
    } */
  }
`;

const Category = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #8b8b8b;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    color: #585656;
  }

  ${(props) =>
    props.active &&
    css`
      border-bottom: 4px solid #000;
      color: #000;
      &:hover {
        color: #000;
      }
    `} /* ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      $:hover {
        color: #3bc9db;
      }
    `} */
    & + & {
    margin-left: 70px;
  }
`;

export default RenterNavbar;
