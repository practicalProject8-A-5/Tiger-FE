import React from "react";
import styled from "styled-components";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

// const labels = props.data.map(c => c.label)
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  // labels: ["6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  labels,
  datasets: [
    {
      label: "Dataset 1",
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      // data: labels.map((temp) => temp),
      data: [10, 20, 30, 40, 50, 60, 70],
      backgroundColor: "rgb(255, 99, 132)",
      datalabels: {
        color: "white",
      },
    },
    {
      label: "Dataset 2",
      // data: labels.map((temp) => temp),
      data: [20, 40, 60, 80, 100, 120, 140],
      backgroundColor: "rgb(75, 192, 192)",
      datalabels: {
        color: "white",
      },
    },
    {
      label: "Dataset 3",
      // data: labels.map((temp) => temp),
      data: [30, 60, 90, 120, 150, 180, 210],
      backgroundColor: "rgb(53, 162, 235)",
      datalabels: {
        color: "white",
      },
    },
  ],
  tooltips: {},
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "차량 별 월 매출입니다",
      color: "#8b8b8b",
      padding: {
        bottom: 30,
      },
      font: {
        size: 20,
      },
    },
    legend: {
      display: true,
      position: "bottom",
      strokeStyle: "red",
      labels: {
        font: {
          size: 12,
          style: "italic",
          family: '"Oswald", sans-serif',
          weight: "800",
        },
      },
    },
    datalabels: {
      display: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const MonthBar = () => {
  return (
    <StMonthBar>
      <Bar data={data} options={options} />
    </StMonthBar>
  );
};

export default MonthBar;

const StMonthBar = styled.div`
  margin-top: 48px;
  width: 50% !important;
  height: 523px !important;

  height: 705px !important;
  /* background-color: skyblue; */
`;
