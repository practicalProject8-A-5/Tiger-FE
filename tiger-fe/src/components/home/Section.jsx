import React from "react";
import styled from "styled-components";

import logo from "../../assets/home_image/logo_opacity2.png";
import pin from "../../assets/home_image/MAP.png";
import calender from "../../assets/home_image/CALENDAR.png";
import finance from "../../assets/home_image/FINANCE.png";

import Fade from "react-reveal/Fade";
import LightSpeed from "react-reveal/LightSpeed";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";
import Swing from "react-reveal/Swing";
import Reveal from "react-reveal/Reveal";

import toggle from "../../assets/home_image/owner_switch.png";
import btn from "../../assets/home_image/button.png";
import form from "../../assets/home_image/inform.png";

import chart from "../../assets/home_image/image_chart.png";
import calculate from "../../assets/home_image/image_chart2.png";

const Section = () => {
  return (
    <StSection>
      <div className="desc">
        <div className="logo">
          {/* <div className="img"></div> */}
          <img src={logo} alt="로고" />
        </div>
        <div className="desc_text">
          <LightSpeed left>
            <h3>랜터모드로 타,이거를 즐겨보세요!</h3>
            <p>이 모든 서비스를 경험할 수 있어요.</p>
          </LightSpeed>
        </div>
      </div>

      <div className="item_box_wrap">
        <Zoom>
          <div className="item_box">
            <img src={pin} alt="위치" />
            <p>내가 있는 곳 어디서나,</p>
            <p>위치 기반 렌트</p>
          </div>
        </Zoom>
        <Zoom>
          <div className="item_box">
            <img src={calender} alt="달력" />
            <p>원하는 날짜와 시간에,</p>
            <p>손쉬운 단기 렌트</p>
          </div>
        </Zoom>
        <Zoom>
          <div className="item_box">
            <img src={finance} alt="수익" />
            <p>보다 합리적으로,</p>
            <p>간편한 영수증 관리</p>
          </div>
        </Zoom>
      </div>

      <h2>스마트한 오너가 되고 싶으신가요?</h2>

      <div className="list_wrap">
        <div className="list">
          <span>1.</span>
          <Flip top>
            <p>회원가입 후 마이페이지에서 간편하게 오너모드로 전환</p>
          </Flip>
          <Swing>
            <img src={toggle} alt="토글사진" />
          </Swing>
          {/* <div className="list_img"></div> */}
        </div>
        <div className="list">
          <span>2.</span>
          <Flip top>
            <p>차량등록 버튼을 눌러 빠르게 내 차 등록</p>
          </Flip>
          <div className="img_box">
            <Swing>
              <img src={btn} alt="버튼" />
            </Swing>
            <Swing>
              <img src={form} alt="폼" />
            </Swing>
          </div>
          {/* <div className="list_img"></div> */}
        </div>
        <div className="list">
          <span>3.</span>
          <Flip top>
            <p>마이페이지 &rarr; 정산에서 편리하게 수익관리</p>
          </Flip>
          <div className="img_box">
            <Swing>
              <img src={chart} alt="차트" />
            </Swing>
            <Swing>
              <img src={calculate} alt="정산" />
            </Swing>
          </div>
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
          }}>
          <div className="qna">
            <Reveal effect="showUp" duration={1500}>
              <p>자주 묻는 질문 FAQ</p>
            </Reveal>
          </div>
        </div>
      </div>
    </StSection>
  );
};

export default Section;

const StSection = styled.div`
  padding-top: 240px;
  width: 100%;
  height: 300vh;
  .desc {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.4;
      margin-bottom: 27px;
      object-fit: cover;
    }
    .desc_text {
      position: absolute;
      text-align: center;
      top: 190px;
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
  }
  .item_box_wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 130px;
    box-sizing: border-box;
    .item_box {
      width: 480px;
      height: 440px;
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
      }
      img {
        margin: 0 auto 65px auto;
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
      width: 1600px;
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
      position: relative;
      margin: 0 auto 58px auto;
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
      img {
        position: absolute;
        top: 33%;
        right: 140px;
      }
      .img_box {
        position: absolute;
        top: 14%;
        right: 30px;
        display: flex;
        align-items: center;
        gap: 30px;
        img {
          position: relative;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .circle_box {
    margin-top: 200px;
    width: 100%;
    height: 665px;
    overflow: hidden;
    .circle {
      margin-top: 104px;
      width: 100%;
      height: 800px;
      position: relative;
      border-radius: 50%;
      transform: scale(1.4);
      margin-top: 160px;
      .qna {
        overflow: hidden;
        position: absolute;
        top: 104px;
        left: 50%;
        height: 60px;
        transform: translateX(-50%);
        p {
          font-weight: 600;
          font-size: 42px;
          color: #000;
          /* animation: showUp 1.5s;
          @keyframes showUp {
            from {
              transform: translateY(60px);
            }
            to {
              transform: translateY(0);
            }
          } */
        }
      }
    }
  }
`;
