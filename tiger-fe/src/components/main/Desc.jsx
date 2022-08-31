import React from "react";
import styled from "styled-components";

const Desc = () => {
  return (
    <StDesc>
      <p>내가 쓰고 싶은 차</p>
      <p>모두 이곳에서 자유롭게</p>
    </StDesc>
  );
};

export default Desc;

const StDesc = styled.div`
  margin-top: 120px;
  font-size: 48px;
  text-align: center;
`;
