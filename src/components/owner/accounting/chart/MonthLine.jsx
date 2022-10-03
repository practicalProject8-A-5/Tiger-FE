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
  // console.log(monthLineData);
  let currentYear = new Date().getFullYear();
  //달
  // let labelDate = new Date(currentYear, 9, 0).getDate(); // 일수 구하기

  const [year, setYear] = useState(currentYear);

  const clickNext = () => {
    if (year < currentYear) {
      setYear(year + 1);
    }
    // console.log("next");
  };
  const clickPrev = () => {
    if (year > 1) {
      setYear(year - 1);
    }
    // console.log("prev");
  };

  let dataSum = monthLineData.map((el) => el.sum);
  // let dataMonth =
  // console.log(dataSum);

  let labelData = [
    { date: `${year}-01`, sum: 0 },
    { date: `${year}-02`, sum: 0 },
    { date: `${year}-03`, sum: 0 },
    { date: `${year}-04`, sum: 0 },
    { date: `${year}-05`, sum: 0 },
    { date: `${year}-06`, sum: 0 },
    { date: `${year}-07`, sum: 0 },
    { date: `${year}-08`, sum: 0 },
    { date: `${year}-09`, sum: 0 },
    { date: `${year}-10`, sum: 0 },
    { date: `${year}-11`, sum: 0 },
    { date: `${year}-12`, sum: 0 },
  ];

  let formatData = [];

  labelData.forEach((formatDataEl) => {
    const filterData = monthLineData.filter(
      (dataEl) => dataEl.date === formatDataEl.date
    );
    if (filterData.length === 1) {
      formatData.push(filterData[0].sum);
    } else {
      formatData.push(0);
    }
    // console.log(filterData);
  });
  // console.log(formatData);

  const data = {
    labels: [...labelData.map((el) => (el = el.date))],
    datasets: [
      {
        label: `월별`,
        data: [
          ...formatData,
          // { x: "2022-01", y: 0 },
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

    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        // display: false,
        display: true,
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
