// eslint-disable-next-line

import React from "react";
import styled, { css } from "styled-components";

const NavBar = ({ category, onSelect }) => {
  const categories = [
    {
      name: "Registration",
      text: "등록 차량",
    },
    {
      name: "Reservation",
      text: "예약 주문",
    },
    {
      name: "progress",
      text: "진행 주문",
    },
    {
      name: "return",
      text: "지난 주문",
    },
    {
      name: "Refund",
      text: "환불",
    },
    {
      name: "Profit",
      text: "수익 현황",
    },
    // {
    //   name: "Calculate",
    //   text: "정산 관리",
    // },
  ];
  return (
    <StNavBar>
      <div className="wrap">
        {categories.map((c) => (
          <Category
            key={c.name}
            active={category === c.name}
            onClick={() => {
              onSelect(c.name);
            }}>
            {c.text}
          </Category>
        ))}
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
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 0 164px;
    .wrap {
      justify-content: space-around;
    }
  }
  @media (max-width: 767px) {
    padding: 0 50px;
    .wrap {
      justify-content: space-around;
    }
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
    `}
  & + & {
    margin-left: 70px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 40px;
    display: flex;
    justify-content: space-between;
    & + & {
      margin-left: 8%;
    }
  }
  @media (max-width: 767px) {
    width: 20px;
    ${(props) =>
      props.active &&
      css`
        border-bottom: 4px solid #000;
        color: #000;
        &:hover {
          color: #000;
        }
      `}
    & + & {
      margin-left: 8%;
    }
  }
`;

export default NavBar;
