import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useEffect } from "react";

import Chart from "chart.js/auto";

const ProfitTest = () => {
  const lineChartRef = useRef(null);
  console.log(lineChartRef);
  // const chartRef = useRef(null);

  useEffect(() => {
    let myChart;
    if (lineChartRef.current !== null) {
      const ctx = lineChartRef.current;
      ctx.style.backgroundColor = "white";
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          // labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              label: "월별",
              data: [250, 80, 1000, 480, 500, 380, 570],
              borderColor: ["#6627f5"],
              borderWidth: 3,
              pointBorderWidth: 2,
              pointStyle: "circle",
              pointBackgroundColor: ["#6627f5"],
              tension: 0.4,
            },
            {
              label: "일별",
              data: [20, 80, 40, 60, 70, 26, 37],
              borderColor: ["#6627f5"],
              borderWidth: 3,
              pointBorderWidth: 2,
              pointStyle: "circle",
              pointBackgroundColor: ["#6627f5"],
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            // responsive: true, //canvas 크기 기본값 설정
            responsive: false,
            y: {
              beginAtZero: true,
              display: true,
            },
            x: {
              display: true,
            },
          },

          plugins: {
            legend: {
              position: "right",
              display: true,
            },
          },
        },
      });
    }
    return () => {
      myChart.destroy();
    };
  }, []);
  // }, [lineChartRef.current]);

  // const data = {
  //   labels: generateLabels(),
  //   datasets: [
  //     {
  //       label: 'Dataset',
  //       data: generateData(),
  //       borderColor: Utils.CHART_COLORS.red,
  //       backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
  //       fill: false
  //     }
  //   ]
  // };

  return (
    <StLineChart
      ref={lineChartRef}
      style={{ width: "900px", height: "200px" }}
    ></StLineChart>
  );
};

const StLineChart = styled.canvas`
  width: 100%;
  height: 475px;
  background-color: pink;
`;
export default ProfitTest;
