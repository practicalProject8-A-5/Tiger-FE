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

const BarChart = ({ dayBarData }) => {
  // console.log(dayBarData);
  let today = new Date();
  let dateYear = today.getFullYear();
  let dateMonth = ("0" + (today.getMonth() + 1)).slice(-2);
  let dateDate = ("0" + today.getDate()).slice(-2);

  let last = new Date(dateYear, dateMonth, 0).getDate();

  //vid 중복 제거 새로운 객체 배열
  const vidData = dayBarData.filter(
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

  // 임시객체
  let carList = {};
  for (let i = 0; i < reformatName.length; i++) {
    let newArray = new Array(last).fill(0);
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

  // console.log(bgColor);

  //datasets 객체 생성
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

  // console.log(last);
  // let vidData = dayBarData.filter(
  //   (arr, index, callback) =>
  //     index === callback.findIndex((el) => el.vid === arr.id)
  // );
  // console.log(vidData);

  //큰 라벨(X축 생성)
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

  labelData.forEach((formatDataEl, idx) => {
    const filterData = dayBarData.filter(
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
  // console.log("formatData :", formatData);

  // ------------------------------------------------------
  const data = {
    labels: [...labelData.map((el) => (el = el.date))],
    // labels: ["1월", "2월", "3월", "4월", "5월", "6월"],

    // labels,
    datasets: [...objData],
    tooltips: {},
  };
  // console.log(data.datasets);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "차량 별 일 매출입니다",
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
        // min: 0,
        // max: 50000,
        // beginAtZero: true,
      },
    },
  };

  return (
    <StDayBar>
      {dayBarData && dayBarData.length === 0 ? (
        <p>오늘은 수익이 없어요.</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </StDayBar>
  );
};

export default BarChart;

const StDayBar = styled.div`
  margin-top: 48px;
  /* width: 50% !important; */
  /* height: 705px !important; */
`;
