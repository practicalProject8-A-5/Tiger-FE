import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import Year from "./chart/Year";
import Month from "./chart/Month";

const Calculate = () => {
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

  return (
    <StCalculate>
      <h2>
        <span>{memberInfo.name}</span>님의 정산관리
      </h2>
      <div className="total_box">
        <div className="total">
          <span>총 수익</span>
          <p>$4,500</p>
        </div>

        <div className="total">
          <span>수수료</span>
          <p>$1,200</p>
        </div>

        <div className="total">
          <span>세금</span>
          <p>$4,500</p>
        </div>
      </div>

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

      <div className="receipt_box">
        <div className="receipt_title">
          <div className="title title_day">날짜</div>
          <div className="subtitle">
            <div className="title">차이름</div>
            <div className="title">수익</div>
            <div className="title">수수료</div>
            <div className="title">세금</div>
          </div>
        </div>

        <div className="item_list">
          <div className="item">
            <div className="item_day">07/09/2022, 06:31</div>
            <div className="subitem">
              <div className="sub_title car_name">차이름</div>
              <div className="sub_title">$1,800</div>
              <div className="sub_title">$2.00</div>
              <div className="sub_title">$1,798</div>
            </div>
          </div>
          <div className="item">
            <div className="item_day">07/09/2022, 06:31</div>
            <div className="subitem">
              <div className="sub_title car_name">차이름</div>
              <div className="sub_title">$1,800</div>
              <div className="sub_title">$2.00</div>
              <div className="sub_title">$1,798</div>
            </div>
          </div>
          <div className="item">
            <div className="item_day">07/09/2022, 06:31</div>
            <div className="subitem">
              <div className="sub_title car_name">차이름</div>
              <div className="sub_title">$1,800</div>
              <div className="sub_title">$2.00</div>
              <div className="sub_title">$1,798</div>
            </div>
          </div>
          <div className="item">
            <div className="item_day">07/09/2022, 06:31</div>
            <div className="subitem">
              <div className="sub_title car_name">차이름</div>
              <div className="sub_title">$1,800</div>
              <div className="sub_title">$2.00</div>
              <div className="sub_title">$1,798</div>
            </div>
          </div>
        </div>
      </div>
    </StCalculate>
  );
};

export default Calculate;

const StCalculate = styled.div`
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

  .total_box {
    /* background-color: pink; */
    display: flex;
    justify-content: space-between;
    margin-top: 54px;
    .total {
      padding: 20px 16px;
      box-sizing: border-box;
      border: 1px solid #dadada;
      border-radius: 10px;
      width: 405px;
      /* height: 84px; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* background-color: pink; */
      span {
        color: #8b8b8b;
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 8px;
      }
      p {
        font-weight: 500;
        font-size: 24px;
        color: #000000;
      }
    }
  }

  .receipt_box {
    width: 100%;
    margin-top: 40px;
    .receipt_title {
      width: 100%;
      background: #f2f2f2;
      border-radius: 8px;
      margin-bottom: 5px;
      display: flex;
      font-weight: 500;
      font-size: 16px;
      color: #000000;
      .title_day {
        width: 350px;
        padding: 19px 40px;
      }
      .subtitle {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .title {
          padding: 19px 40px;
        }
      }
    }

    .item_list {
      background: #ffffff;
      border: 1px solid #f2f2f2;
      border-radius: 8px;
      .item {
        width: 100%;
        display: flex;
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        border-bottom: 1px solid #f2f2f2;
        :nth-last-child(1) {
          border-bottom: none;
          /* background-color: pink; */
        }
        .item_day {
          width: 350px;
          padding: 19px 40px;
        }
        .subitem {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .sub_title {
            padding: 19px 40px;
          }
        }
        .car_name {
          color: #8b8b8b;
        }
      }
    }
  }
`;
