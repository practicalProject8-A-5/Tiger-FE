import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import Year from "./chart/Year";
import Month from "./chart/Month";

const Profit = () => {
  const memberInfo = useSelector((state) => state.memberSlice.userInfo);

  const [openDrop, setOpenDrop] = useState(false);

  const clickOpen = () => {
    setOpenDrop(!openDrop);
  };

  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);

  const clickMonth = () => {
    setMonth(true);
    setYear(false);
  };

  const clickYear = () => {
    setYear(true);
    setMonth(false);
  };

  // console.log("openDrop :", openDrop);
  // console.log("month :", month);
  // console.log("year :", year);

  return (
    <StProfit>
      <h2>
        <span>{memberInfo.name}</span>님의 최근 수익 지표
      </h2>
      <p>날짜별 수익 그래프를 확인해보세요.</p>

      <div className="dropBox" onClick={clickOpen}>
        <div className="box_value">
          <p>{!month ? "연간" : "월간"}</p>
          {!openDrop ? (
            <GoTriangleDown className="down" />
          ) : (
            <GoTriangleUp className="up" />
          )}
        </div>

        {!openDrop ? null : (
          <div className="underBox">
            <div className="month" onClick={clickMonth}>
              월간
            </div>
            <div className="year" onClick={clickYear}>
              연간
            </div>
          </div>
        )}
      </div>
      {!month ? <Year /> : <Month />}
    </StProfit>
  );
};

export default Profit;
const StProfit = styled.div`
  position: relative;
  h2 {
    font-weight: 500;
    font-size: 32px;
    color: #000000;
    margin-bottom: 28px;
    span {
      border-bottom: 2px solid;
    }
  }
  p {
    font-weight: 500;
    font-size: 20px;
    color: #8b8b8b;
  }

  .dropBox {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    .box_value {
      width: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 12px;
      box-sizing: border-box;
      border: 1px solid #ff881b;
      box-shadow: 0px 2px 2px rgb(0 0 0 / 25%);
      border-radius: 8px;
      p {
        font-weight: 500;
        font-size: 14px;
        color: #000000;
        margin-right: 7px;
      }
      .down {
        font-size: 13px;
      }
      .up {
        font-size: 13px;
      }
    }
    .underBox {
      position: absolute;
      top: 35px;
      right: 0;
      box-shadow: 0px 2px 2px rgb(0 0 0 / 25%);
      border-radius: 8px;
      text-align: center;
      .month {
        width: 75px;
        padding: 4px 12px;
        box-sizing: border-box;
        border-radius: 8px 8px 0px 0px;
        /* background: #ffd6b0; */
        background: #fff;
        transition: all 0.6s;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        :hover {
          background: #ffb979;
        }
      }
      .year {
        width: 75px;
        padding: 4px 12px;
        box-sizing: border-box;
        border-radius: 0px 0px 8px 8px;
        background: #fff;
        transition: all 0.6s;
        :hover {
          /* background: #ffb979; */
          background: #ffd6b0;
        }
      }
    }
  }
`;
