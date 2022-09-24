import React, { useState } from "react";
import styled from "styled-components";

import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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

const MonthLine = ({ monthLineData }) => {
  let currentYear = new Date().getFullYear();
  //달
  // let currentMonth = new Date().getMonth() + 1;
  // let month = new Date().getMonth();
  let labelDate = new Date(currentYear, 9, 0).getDate(); // 일수 구하기
  // labelDate.split(" ");

  console.log(currentYear);

  const [year, setYear] = useState(currentYear);

  const clickNext = () => {
    if (year < currentYear) {
      setYear(year + 1);
    }
    console.log("next");
  };
  const clickPrev = () => {
    if (year > 1) {
      setYear(year - 1);
    }
    console.log("prev");
  };

  let dataSum = monthLineData.map((el) => el.sum);
  let dataDate = [
    `${year}-01`,
    `${year}-02`,
    `${year}-03`,
    `${year}-04`,
    `${year}-05`,
    `${year}-06`,
    `${year}-07`,
    `${year}-08`,
    `${year}-09`,
    `${year}-10`,
    `${year}-11`,
    `${year}-12`,
  ];
  // let dataDate = monthLineData.map((el) => el.date);
  console.log(dataDate);

  const data = {
    // labels: ["6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    labels: [...dataDate],
    datasets: [
      {
        label: `월별`,
        data: [
          ...dataSum,
          // { x: "2022-01", y: 0 },
          // { x: "2022-02", y: 20 },
          // { x: "2022-03", y: 10 },
          // { x: "2022-04", y: 50 },
          // { x: "2022-05", y: 40 },
          // { x: "2022-06", y: 90 },
          // { x: "2022-07", y: 150 },
          // { x: "2022-08", y: 20 },
          // { x: "2022-09", y: 60 },
          // { x: "2022-10", y: 58 },
          // { x: "2022-11", y: 49 },
          // { x: "2022-12", y: 29 },
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
          borderColor: ["red"],
          borderWidth: 2,
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
        text: `${year}월별 수익입니다`,
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
        tension: 0.2, //꼭짓점 둥글게
      },
    },
  };

  return (
    <StMonth>
      {year <= 1 ? null : <FaAngleLeft className="prev" onClick={clickPrev} />}
      <Line data={data} options={options} />
      {year < currentYear ? (
        <FaAngleRight className="next" onClick={clickNext} />
      ) : null}
    </StMonth>
  );
};

export default MonthLine;

const StMonth = styled.div`
  position: relative;
  margin-top: 48px;
  /* background-color: pink; */
  .prev {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 20px;
    cursor: pointer;
  }
  .next {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    cursor: pointer;
  }
`;
