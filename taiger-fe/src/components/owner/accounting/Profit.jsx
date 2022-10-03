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

  // const [loading, setLoading] = useState(true);
  // console.log("loading :", loading);

  const [dayLineData, setDayLineData] = useState([]);
  const [monthLineData, setMonthLineData] = useState([]);
  const [dayPieData, setDayPieData] = useState([]);
  const [monthPieData, setMonthPieData] = useState([]);
  const [dayBarData, setDayBarData] = useState([]);
  const [monthBarData, setMonthBarData] = useState([]);

  const [noRevenue, setNoRevenue] = useState(false);
  // console.log(dayLineData);
  // console.log(monthLineData);
  // console.log(dayPieData);
  // console.log(monthPieData);
  // console.log(dayBarData);
  // console.log(monthBarData);

  // 일별 라인차트
  let today = new Date();

  let dateYear = today.getFullYear();
  let dateMonth = ("0" + (today.getMonth() + 1)).slice(-2);
  let dateDate = ("0" + today.getDate()).slice(-2);

  let date = `${dateYear}-${dateMonth}-${dateDate}`;
  // console.log(date);

  const getDayLineChart = async () => {
    // setLoading(true);
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
      // console.log(resp.data.output.Line);
      setDayLineData(resp.data.output.Line);
      // setLoading(false);
    } catch (error) {
      return error;
    }
  };

  // 월별 라인차트
  const getMonthLineChart = async () => {
    // setLoading(true);
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
      // console.log(resp.data.output);
      setMonthLineData(resp.data.output.Line);
      // setLoading(false);
    } catch (error) {
      return error;
    }
  };

  // 일별 파이차트
  const getDayPieChart = async () => {
    // setLoading(true);
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
      // console.log(resp.data.output.pie);
      // if (resp.data.output.pie.length === 0) {
      //   setNoRevenue(true);
      // } else {
      // }
      setDayPieData(resp.data.output.pie);
      // set;
      // setLoading(false);
    } catch (error) {
      return error;
    }
  };

  // 월별 파이차트
  const getMonthPieChart = async () => {
    // setLoading(true);
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
      // console.log(resp.data.output.pie);
      setMonthPieData(resp.data.output.pie);
      // setLoading(false);
    } catch (error) {
      return error;
    }
  };

  // 일별 바차트
  const getDayBarChart = async () => {
    // setLoading(true);
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
      // console.log(resp.data);
      setDayBarData(resp.data.output.bar);
      // setLoading(false);
    } catch (error) {
      // console.log(error);
      return error;
    }
  };

  // 월별 바차트
  const getMonthBarChart = async () => {
    // setLoading(true);
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
      // console.log(resp.data.output.bar);
      setMonthBarData(resp.data.output.bar);
      // setLoading(false);
    } catch (error) {
      return error;
      // console.log(error);
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
      {/* {!month ? <span>날짜별</span> : <span>월간</span>} */}
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
          {/* <div className="temp">
            
          </div> */}
        </>
      ) : (
        <>
          <MonthLine monthLineData={monthLineData} />
          <MonthPie monthPieData={monthPieData} />
          <MonthBar monthBarData={monthBarData} />
          {/* <div className="temp">
            
          </div> */}
        </>
      )}

      {/* <DayLine dayLineData={dayLineData} /> */}
      {/* <MonthLine monthLineData={monthLineData} /> */}
      {/* <DayPie dayPieData={dayPieData} /> */}
      {/* <MonthPie monthPieData={monthPieData} /> */}
      {/* <DayBar dayBarData={dayBarData} /> */}
      {/* <MonthBar monthBarData={monthBarData} /> */}
    </StProfit>
  );
};

export default Profit;
const StProfit = styled.div`
  position: relative;
  height: 300vh;
  /* -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; */
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

  .temp {
    display: flex;
    margin-top: 150px;
  }
`;
