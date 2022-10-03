import React from "react";
import styled from "styled-components";

const Category = () => {
  return (
    <StCategory>
      <div className="category">
        <div className="svg"></div>
        <span>소형차</span>
      </div>
      <div className="category">
        <div className="svg"></div>
        <span>중형차</span>
      </div>
      <div className="category">
        <div className="svg"></div>
        <span>SUV</span>
      </div>
      <div className="category">
        <div className="svg"></div>
        <span>세단</span>
      </div>
      <div className="category">
        <div className="svg"></div>
        <span>경차</span>
      </div>
    </StCategory>
  );
};

export default Category;

const StCategory = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: pink; */
  margin: 82px 0 108px 0;
  .category {
    margin-right: 180px;
    text-align: center;
    :nth-child(5) {
      margin: 0;
    }
    div {
      width: 70px;
      height: 70px;
      background-color: orange;
      margin-bottom: 14px;
    }
    span {
      font-size: 18px;
    }
  }
`;

// https://via.placeholder.com
