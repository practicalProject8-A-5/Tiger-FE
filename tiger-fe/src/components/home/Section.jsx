import React from "react";
import styled from "styled-components";

import logo from "../../assets/apple-icon.png";

const Section = () => {
  // const [hue, setHue] = React.useState(340);
  return (
    <StSection>
      <div className="desc">
        <div className="logo">
          <div className="img"></div>
        </div>
        <h3>랜터모드로 타,이거를 즐겨보세요!</h3>
        <p>이 모든 서비스를 경험할 수 있어요.</p>
      </div>

      <div className="item_box_wrap">
        <div className="item_box">
          {/* <img src="" alt="위치" /> */}
          <div className="item_img"></div>
          <p>내가 있는 곳 어디서나,</p>
          <p>위치 기반 렌트</p>
        </div>
        <div className="item_box">
          {/* <img src="" alt="달력" /> */}
          <div className="item_img"></div>
          <p>원하는 날짜와 시간에,</p>
          <p>손쉬운 단기 렌트</p>
        </div>
        <div className="item_box">
          {/* <img src="" alt="수익" /> */}
          <div className="item_img"></div>
          <p>보다 합리적으로,</p>
          <p>간편한 영수증 관리</p>
        </div>
      </div>

      <h2>스마트한 오너가 되고 싶으신가요?</h2>

      <div className="list_wrap">
        <div className="list">
          <span>1.</span>
          <p>회원가입 후 마이페이지에서 간편하게 오너모드로 전환</p>
          {/* <img src="" alt="" /> */}
          <div className="list_img"></div>
        </div>
        <div className="list">
          <span>2.</span>
          <p>차량등록 버튼을 눌러 빠르게 내 차 등록</p>
          {/* <img src="" alt="" /> */}
          <div className="list_img"></div>
        </div>
        <div className="list">
          <span>3.</span>
          <p>마이페이지 &rarr; 정산에서 편리하게 수익관리</p>
          {/* <img src="" alt="" /> */}
          <div className="list_img"></div>
        </div>
      </div>

      <div className="circle_box">
        <div
          className="circle"
          style={{
            background:
              "linear-gradient(to bottom, #ffe6d1 10%, #fffbf6, #fff 80%",
          }}
        >
          <p>자주 묻는 질문 FAQ</p>
        </div>
      </div>
    </StSection>
  );
};

export default Section;

const StSection = styled.div`
  padding-top: 240px;
  /* background-color: khaki; */
  width: 100%;
  height: 300vh;
  .desc {
    /* background-color: skyblue; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo {
      opacity: 0.4;
      margin-bottom: 27px;
      .img {
        width: 99px;
        height: 102px;
        background-color: #ff881b;
      }
    }
    h3 {
      font-weight: 600;
      font-size: 42px;
      color: #000000;
      margin-bottom: 18px;
    }
    p {
      font-weight: 600;
      font-size: 32px;
      color: #8b8b8b;
    }
  }
  .item_box_wrap {
    width: 100%;
    /* background-color: pink; */
    display: flex;
    justify-content: space-between;
    padding: 0 130px;
    box-sizing: border-box;
    .item_box {
      width: 500px;
      height: 460px;
      background: #ffffff;
      box-shadow: 0px -2px 80px rgba(0, 0, 0, 0.04),
        0px -0.6px 30px rgba(0, 0, 0, 0.04),
        0px -0.375647px 17.7806px rgba(0, 0, 0, 0.04),
        0px -0.1px 6.4309px rgba(0, 0, 0, 0.02);
      border-radius: 36px;
      text-align: center;
      position: relative;
      padding: 50px 65px 80px 65px;
      margin-top: 60px;
      box-sizing: border-box;
      .item_img {
        width: 160px;
        height: 160px;
        background-color: tomato;
        margin: 0 auto 65px auto;
        /* position: absolute; */
        /* top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); */
      }
      p {
        font-weight: 600;
        font-size: 32px;
        color: #4d4d4d;
        margin-bottom: 15px;
      }
    }
  }
  h2 {
    margin: 160px 0 58px 0;
    text-align: center;
    font-weight: 600;
    font-size: 42px;
    color: #000;
  }

  .list_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 130px;
    box-sizing: border-box;
    .list {
      width: 100%;
      height: 222px;
      background-color: pink;
      margin-bottom: 58px;
      padding: 85px 87px;
      box-sizing: border-box;
      display: flex;
      background: #ffffff;
      box-shadow: 0px -2px 80px rgba(0, 0, 0, 0.04),
        0px -0.6px 30px rgba(0, 0, 0, 0.04),
        0px -0.375647px 17.7806px rgba(0, 0, 0, 0.04),
        0px -0.1px 6.4309px rgba(0, 0, 0, 0.02);
      border-radius: 36px;
      span {
        font-weight: 600;
        font-size: 42px;
        color: #ff881b;
        margin-right: 40px;
      }
      p {
        font-weight: 600;
        font-size: 38px;
        color: #4d4d4d;
      }
      .list_img {
      }
    }
  }
  .circle_box {
    margin-top: 200px;
    width: 100%;
    height: 665px;
    /* background-color: pink; */
    overflow: hidden;
    .circle {
      margin-top: 104px;
      width: 100%;
      height: 800px;
      position: relative;
      border-radius: 50%;
      transform: scale(1.4);
      margin-top: 160px;
      p {
        position: absolute;
        top: 104px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 600;
        font-size: 42px;
        color: #000;
      }
    }
  }
`;
