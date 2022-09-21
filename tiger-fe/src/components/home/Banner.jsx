import React from "react";
import styled from "styled-components";

import Banner from "../../assets/home_image/banner.png";

const banner = () => {
  return (
    <StBanner>
      <div className="text_box">
        <p>즉흥적인 여행에 차가 없다면?</p>
        <p>타,이거</p>
      </div>
    </StBanner>
  );
};

export default banner;

const StBanner = styled.div`
  background-color: pink;
  width: 100%;
  height: 660px;
  position: relative;
  background-image: url(${Banner});
  .text_box {
    width: 650px;
    height: 127px;
    position: absolute;
    bottom: 101px;
    left: 55px;
    font-weight: 600;
    font-size: 48px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: text-show 2s;

    @keyframes text-show {
      from {
        opacity: 0;
        transform: translateY(-70px);
      }
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
`;
