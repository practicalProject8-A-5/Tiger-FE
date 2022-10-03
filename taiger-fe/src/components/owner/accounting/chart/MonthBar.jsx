import React, { useState } from "react";
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

const MonthBar = ({ monthBarData }) => {
  // console.log(monthBarData);

  let currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

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

  const vidData = monthBarData.filter(
    (arr, index, callback) =>
      index === callback.findIndex((el) => el.vid === arr.vid)
  );
  // console.log(vidData);

  let reformatName = vidData.map((obj) => {
    let robj = {
      name: "",
    };
    robj = `${obj.vbrand}${obj.vname}`;
    return robj;
  });
  // console.log(reformatName);

  let carList = {};
  for (let i = 0; i < reformatName.length; i++) {
    let newArray = new Array(12).fill(0);
    carList[reformatName[i]] = newArray;
  }
  // console.log(carList);

  const bgColor = [
    "rgba(255, 99, 132, 0.9)",
    "rgba(54, 162, 235, 0.9)",
    "rgba(255, 206, 86, 0.9)",
    "rgba(75, 192, 192, 0.9)",
    "rgba(153, 102, 255, 0.9)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  let objData = [];
  for (let i = 0; i <= vidData.length - 1; i++) {
    objData.push({
      label: reformatName[i],
      data: [],
      backgroundColor: bgColor[i],
      datalabels: {
        color: "white",
      },
    });
  }
  // console.log("objData :", objData);

  let formatData = [];

  labelData.forEach((formatDataEl, idx) => {
    const filterData = monthBarData.filter(
      (dataEl) => dataEl.date === formatDataEl.date
    );
    if (filterData.length >= 1) {
      formatData.push(filterData);
    } else {
      formatData.push(0);
    }
    // console.log("idx :", idx + 1);
    // console.log("filterData :", filterData);

    filterData.map((el) => {
      let carName = `${el.vbrand}${el.vname}`;
      carList[carName][idx] = el.sum;
    });
  });
  // console.log("carList ==>", carList);

  objData.forEach((el) => {
    const tempLabel = el.label;
    el.data = carList[tempLabel];
    // el.backgroundColor =
  });

  // console.log("newobjData :", objData);

  const data = {
    labels: [...labelData.map((el) => (el = el.date))],
    datasets: [...objData],
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

  return (
    <StMonthBar>
      {monthBarData && monthBarData.length === 0 ? (
        <p>오늘은 수익이 없어요.</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </StMonthBar>
  );
};

export default MonthBar;

const StMonthBar = styled.div`
  margin-top: 48px;
  /* width: 50% !important; */
  height: 705px !important;
  /* background-color: skyblue; */
`;
