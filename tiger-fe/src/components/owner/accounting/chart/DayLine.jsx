import React from "react";
import styled from "styled-components";

import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartDataLabels
);

const DayLine = () => {
  const [chartData, setChartData] = useState(null);

  console.log(chartData);

  const data = {
    // labels: ["6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    labels: [
      "2022-09-01",
      "2022-09-02",
      "2022-09-03",
      "2022-09-04",
      "2022-09-05",
      "2022-09-06",
      "2022-09-07",
      "2022-09-08",
      "2022-09-09",
      "2022-09-10",
      "2022-09-11",
      "2022-09-12",
      "2022-09-13",
      "2022-09-14",
      "2022-09-15",
      "2022-09-16",
      "2022-09-17",
      "2022-09-18",
      "2022-09-19",
      "2022-09-20",
      "2022-09-21",
      "2022-09-22",
      "2022-09-23",
      "2022-09-24",
      "2022-09-25",
      "2022-09-26",
      "2022-09-27",
      "2022-09-28",
      "2022-09-29",
      "2022-09-30",
    ],
    datasets: [
      {
        label: "일별",
        data: [
          { x: "2022-09-01", y: 5 },
          { x: "2022-09-02", y: 0 },
          { x: "2022-09-03", y: 21 },
          { x: "2022-09-04", y: 0 },
          { x: "2022-09-05", y: 0 },
          { x: "2022-09-06", y: 50 },
          { x: "2022-09-07", y: 38 },
          { x: "2022-09-08", y: 49 },
          { x: "2022-09-09", y: 70 },
          { x: "2022-09-10", y: 90 },
          { x: "2022-09-11", y: 30 },
          { x: "2022-09-12", y: 102 },
          { x: "2022-09-13", y: 80 },
          { x: "2022-09-14", y: 85 },
          { x: "2022-09-15", y: 97 },
          { x: "2022-09-16", y: 120 },
          { x: "2022-09-17", y: 54 },
          { x: "2022-09-18", y: 29 },
          { x: "2022-09-19", y: 76 },
          { x: "2022-09-20", y: 91 },
          { x: "2022-09-21", y: 148 },
          { x: "2022-09-22", y: 90 },
          { x: "2022-09-23", y: 0 },
          { x: "2022-09-24", y: 0 },
          { x: "2022-09-25", y: 0 },
          { x: "2022-09-26", y: 0 },
          { x: "2022-09-27", y: 0 },
          { x: "2022-09-28", y: 0 },
          { x: "2022-09-29", y: 0 },
          { x: "2022-09-30", y: 0 },
        ],
        fill: true,
        backgroundColor: "rgba(244, 117, 96, 0.2",
        borderColor: "#FF881B",
        pointBorderColor: "#fc7b02",
        color: "#8b8b8b",
      },
    ],
  };

  const options = {
    //플러그인
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 20,
            style: "italic",
            // family: '"Bungee Spice", cursive',
            family: '"Oswald", sans-serif',
            weight: "800",
          },
        },
      },
      title: {
        display: true,
        text: "일별 수익입니다",
        color: "#8b8b8b",
        padding: {
          bottom: 30,
        },
        font: {
          size: 20,
        },
      },
      tooltip: {},
      datalabels: {
        display: false,
      },
    },

    elements: {
      point: {
        radius: 5,
        backgroundColor: ["blue"],
        borderColor: ["red"],
        borderWidth: 2,
        hoverRadius: 8,
        hoverBorderWidth: 2,
      },
      line: {
        tension: 0, //꼭짓점 둥글게
      },
    },
  };

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
        `https://run.mocky.io/v3/bbdeb8e0-1230-48f0-95c7-7e420ece1f3b`,
        // `/api/order/payout/line/day?date={date}`,
        {
          headers: headers,
        }
      );
      // console.log(resp.data.output);
      setChartData(resp.data.output);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDayPieChart();
    // console.log("1");
  }, []);

  return (
    <StDayLine>
      <Line data={data} options={options} />
    </StDayLine>
  );
};

export default DayLine;

const StDayLine = styled.div`
  margin-top: 48px;
`;
