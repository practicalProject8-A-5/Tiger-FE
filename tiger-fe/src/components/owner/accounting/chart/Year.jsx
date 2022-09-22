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
        { x: "2022-09-02", y: 10 },
        { x: "2022-09-03", y: 21 },
        { x: "2022-09-04", y: 30 },
        { x: "2022-09-05", y: 24 },
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
        { x: "2022-09-23", y: 160 },
        { x: "2022-09-24", y: 178 },
        { x: "2022-09-25", y: 124 },
        { x: "2022-09-26", y: 108 },
        { x: "2022-09-27", y: 140 },
        { x: "2022-09-28", y: 85 },
        { x: "2022-09-29", y: 50 },
        { x: "2022-09-30", y: 77 },
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
      text: "연별 수익입니다",
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
      tension: 0, //꼭짓점 둥글게
    },
  },
};

const Year = () => {
  return (
    <StYear>
      <Line data={data} options={options} />
    </StYear>
  );
};

export default Year;

const StYear = styled.div`
  margin-top: 48px;
`;
