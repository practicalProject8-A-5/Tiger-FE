// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DayLine from "./chart/DayLine";
import MonthLine from "./chart/MonthLine";
import MonthPie from "./chart/MonthPie";
import MonthBar from "./chart/MonthBar";
import DayPie from "./chart/DayPie";
import DayBar from "./chart/DayBar";

const serverApi = process.env.REACT_APP_SERVER;

const Profit = () => {
  const memberInfo = useSelector((state) => state.memberSlice.userInfo);

  const [openDrop, setOpenDrop] = useState(false);

  const clickOpen = () => {
    setOpenDrop(!openDrop);
  };

  const [month, setMonth] = useState(true);
  const [year, setYear] = useState(false);

  const clickMonth = () => {
    setMonth(true);
    setYear(false);
  };

  const clickYear = () => {
    setYear(true);
    setMonth(false);
  };

  const [dayLineData, setDayLineData] = useState([]);
  const [monthLineData, setMonthLineData] = useState([]);
  const [dayPieData, setDayPieData] = useState([]);
  const [monthPieData, setMonthPieData] = useState([]);
  const [dayBarData, setDayBarData] = useState([]);
  const [monthBarData, setMonthBarData] = useState([]);

  const [noRevenue, setNoRevenue] = useState(false);

  // 일별 라인차트
  let today = new Date();

  let dateYear = today.getFullYear();
  let dateMonth = ("0" + (today.getMonth() + 1)).slice(-2);
  let dateDate = ("0" + today.getDate()).slice(-2);

  let date = `${dateYear}-${dateMonth}-${dateDate}`;

  const getDayLineChart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner/payout/day?date=${date}`,
        {
          headers: headers,
        }
      );
      setDayLineData(resp.data.output.Line);
    } catch (error) {
      return error;
    }
  };

  // 월별 라인차트
  const getMonthLineChart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner/payout/month?date=${date}`,
        {
          headers: headers,
        }
      );
      setMonthLineData(resp.data.output.Line);
    } catch (error) {
      return error;
    }
  };

  // 일별 파이차트
  const getDayPieChart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner/payout/day?date=${date}`,
        {
          headers: headers,
        }
      );
      setDayPieData(resp.data.output.pie);
    } catch (error) {
      return error;
    }
  };

  // 월별 파이차트
  const getMonthPieChart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner/payout/month?date=${date}`,
        {
          headers: headers,
        }
      );
      setMonthPieData(resp.data.output.pie);
    } catch (error) {
      return error;
    }
  };

  // 일별 바차트
  const getDayBarChart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner/payout/day?date=${date}`,
        {
          headers: headers,
        }
      );
      setDayBarData(resp.data.output.bar);
    } catch (error) {
      return error;
    }
  };

  // 월별 바차트
  const getMonthBarChart = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: userToken,
        RefreshToken: refreshToken,
      };
      const resp = await axios.get(
        `${serverApi}/order/owner/payout/month?date=${date}`,
        {
          headers: headers,
        }
      );
      setMonthBarData(resp.data.output.bar);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getDayLineChart();
    getMonthLineChart();
    getDayPieChart();
    getMonthPieChart();
    getDayBarChart();
    getMonthBarChart();
  }, []);

  return (
    <StProfit>
      <h2>
        <span>{memberInfo.name}</span>님의 최근 수익 지표
      </h2>
      <p>날짜별 수익 그래프를 확인해보세요.</p>

      <div className="dropBox" onClick={clickOpen}>
        <div className="box_value">
          <p>{!month ? <span>일간</span> : <span>월간</span>}</p>
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
              일간
            </div>
          </div>
        )}
      </div>
      {!month ? (
        <>
          <DayLine dayLineData={dayLineData} />
          <DayPie dayPieData={dayPieData} />
          <DayBar dayBarData={dayBarData} />
        </>
      ) : (
        <>
          <MonthLine monthLineData={monthLineData} />
          <MonthPie monthPieData={monthPieData} />
          <MonthBar monthBarData={monthBarData} />
        </>
      )}
    </StProfit>
  );
};

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
        span {
        }
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
          background: #ffd6b0;
        }
      }
    }
  }

  .temp {
    display: flex;
    margin-top: 150px;
  }
`;

export default Profit;
