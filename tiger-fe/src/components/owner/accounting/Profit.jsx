import React from "react";
import styled from "styled-components";

const Profit = () => {
  return (
    <StProfit>
      <h2>00님의 최근 수익 지표</h2>
      <p>날짜별 수익 그래프를 확인해보세요.</p>

      <canvas id="myChart" width="400" height="400"></canvas>
    </StProfit>
  );
};

export default Profit;
const StProfit = styled.div`
  background-color: pink;
`;
