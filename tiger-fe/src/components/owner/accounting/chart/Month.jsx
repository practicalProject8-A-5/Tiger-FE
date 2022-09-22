import React from "react";
import styled from "styled-components";

import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";

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
  SubTitle
);

const data = {
  // labels: ["6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  labels: [
    "2022-01",
    "2022-02",
    "2022-03",
    "2022-04",
    "2022-05",
    "2022-06",
    "2022-07",
    "2022-08",
    "2022-09",
    "2022-10",
    "2022-11",
    "2022-12",
  ],
  datasets: [
    {
      label: "월별",
      data: [
        { x: "2022-01", y: 0 },
        { x: "2022-02", y: 20 },
        { x: "2022-03", y: 10 },
        { x: "2022-04", y: 50 },
        { x: "2022-05", y: 40 },
        { x: "2022-06", y: 90 },
        { x: "2022-07", y: 150 },
        { x: "2022-08", y: 20 },
        { x: "2022-09", y: 60 },
        { x: "2022-10", y: 58 },
        { x: "2022-11", y: 49 },
        { x: "2022-12", y: 29 },
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
      position: "right",
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
      text: "월별 수익입니다",
      color: "#8b8b8b",
      padding: {
        bottom: 30,
      },
      font: {
        size: 20,
      },
    },
    tooltip: {},
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
      tension: 0.2, //꼭짓점 둥글게
    },
  },
};

const Month = () => {
  return (
    <StMonth>
      <Line data={data} options={options} />
    </StMonth>
  );
};

export default Month;

const StMonth = styled.div`
  margin-top: 48px;
`;
