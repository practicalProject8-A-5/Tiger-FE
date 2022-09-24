import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
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

const MonthPie = ({ monthPieData }) => {
  console.log("monthPieData :", monthPieData);

  let reformatName = monthPieData.map((obj) => {
    let robj = {
      name: "",
    };
    robj = `${obj.vbrand}${obj.vname}`;
    return robj;
  });

  let dataSum = monthPieData.map((el) => el.sum);

  let total = 0;
  dataSum.forEach((item) => {
    total += item;
  });

  const data = {
    labels: [...reformatName],
    // labels: ["1", "2"],
    datasets: [
      {
        // label: "# of Votes",
        // data: [12, 19, 3, 5, 2, 3],
        data: [...dataSum],
        // fill: true,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        // pointBorderColor: "#fc7b02",
        color: "#8b8b8b",
        datalabels: {
          color: "#000",
          font: {
            size: "13",
          },
        },
      },
    ],
  };

  const options = {
    //플러그인
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 18,
            style: "italic",
            // family: '"Bungee Spice", cursive',
            family: '"Oswald", sans-serif',
            weight: "800",
          },
          // padding: {
          //   left: 30,
          // },
        },
      },
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
      subtitle: {
        display: true,
        text: `총 수익은 ${total}원`,
        padding: {
          bottom: 10,
        },
        font: {
          size: 15,
          weight: 600,
          style: "oblique",
        },
      },
      datalabels: {
        display: true,
      },
    },
  };

  return (
    <StMonthPie>
      <Pie data={data} options={options} />
    </StMonthPie>
  );
};

export default MonthPie;

const StMonthPie = styled.div`
  margin-top: 48px;
  width: 50% !important;
  height: 100% !important;
  /* background-color: pink; */
`;
