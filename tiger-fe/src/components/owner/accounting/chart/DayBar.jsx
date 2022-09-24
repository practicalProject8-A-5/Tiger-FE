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
  console.log(dayBarData);
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
    const filterData = dayBarData.filter(
      (dataEl) => dataEl.date === formatDataEl.date
    );
    if (filterData.length === 1) {
      formatData.push(filterData[0].sum);
    } else {
      formatData.push(0);
    }
    // console.log(filterData);
  });

  const data = {
    // labels: [...labelData.map((el) => (el = el.date))],
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],

    // labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10000, 12000, 12000, 12000, 12000],
        backgroundColor: "rgb(255, 99, 132)",
        datalabels: {
          color: "white",
        },
      },
      {
        label: "Dataset 2",
        data: [9000, 9000, 9000, 10000, 12000, 9000, 15000],
        backgroundColor: "rgb(75, 192, 192)",
        datalabels: {
          color: "white",
        },
      },
      {
        label: "Dataset 3",
        data: [8000, 14000, 9000, 11000, 10000, 12000],
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
        min: 0,
        max: 50000,
        // beginAtZero: true,
      },
    },
  };

  return (
    <StDayBar>
      <Bar data={data} options={options} />
    </StDayBar>
  );
};

export default BarChart;

const StDayBar = styled.div`
  margin-top: 48px;
  /* width: 50% !important; */
  /* height: 705px !important; */
`;
