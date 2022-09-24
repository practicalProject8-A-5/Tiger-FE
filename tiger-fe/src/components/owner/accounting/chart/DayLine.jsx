import React from "react";
import styled from "styled-components";

import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";

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

const DayLine = ({ dayLineData }) => {
  let today = new Date();
  let dateYear = today.getFullYear();
  let dateMonth = ("0" + (today.getMonth() + 1)).slice(-2);
  let dateDate = ("0" + today.getDate()).slice(-2);

  let last = new Date(dateYear, dateMonth, 0).getDate();
  // console.log(last);

  let labelData = [];
  for (let i = 1; i <= last; i++) {
    if (i < 10) {
      labelData.push({ date: `${dateYear}-${dateMonth}-0${i}`, sum: 0 });
    } else {
      labelData.push({ date: `${dateYear}-${dateMonth}-${i}`, sum: 0 });
    }
  }
  // console.log(labelData); // 매월 1일~마지막 일 과 default 가격(0)

  let formatData = [];

  labelData.forEach((formatDataEl) => {
    const filterData = dayLineData.filter(
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
        label: "일별",
        data: [...formatData],
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
    <StDayLine>
      <Line data={data} options={options} />
    </StDayLine>
  );
};

const StDayLine = styled.div`
  margin-top: 48px;
`;
export default DayLine;
