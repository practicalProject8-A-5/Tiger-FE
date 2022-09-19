import React from "react";
import styled from "styled-components";
import Search from "../../global_elements/Search";
import { FaSearch } from "react-icons/fa";

const HomeSearch = () => {
  return (
    <StSearch>
      <div className="text_box">
        <p>
          어디<span>든지</span>
        </p>
        <p>
          언제<span>든지</span>
        </p>
        <p>
          어떤 차<span>든지</span>
        </p>
      </div>
      <div className="input_box">
        <input type="text" />
        <input type="text" className="date" />
        <input type="text" />
      </div>

      <div className="searh_btn">
        <FaSearch className="search_i" />
        <p>차량 검색</p>
      </div>
    </StSearch>
  );
};

export default HomeSearch;

const StSearch = styled.div`
  width: 1470px;
  height: 190px;
  background-color: #fff;
  /* background-color: skyblue; */
  box-shadow: 0px 46px 96px rgba(0, 0, 0, 0.08),
    0px 15.375px 26.2996px rgba(0, 0, 0, 0.0521271),
    0px 6.38599px 10.2342px rgba(0, 0, 0, 0.04),
    0px 2.30969px 3.45191px rgba(0, 0, 0, 0.0278729);
  border-radius: 36px;
  position: absolute;
  top: 705px;
  left: 96px;
  .text_box {
    width: 100%;
    /* background-color: yellowgreen; */
    display: flex;
    justify-content: space-around;
    font-weight: 600;
    font-size: 24px;
    color: #4d4d4d;
    margin-top: 34px;
    span {
      color: #ff881b;
    }
  }
  .input_box {
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
    input {
      width: 400px;
      height: 55px;
      outline: none;
      border: none;
      background: #f2f2f2;
      border-radius: 12px;
    }
    .date {
      width: 540px;
    }
  }
  .searh_btn {
    width: 240px;
    height: 188px;
    background: #ff881b;
    box-shadow: 0px 46px 96px rgba(0, 0, 0, 0.08),
      0px 15.375px 26.2996px rgba(0, 0, 0, 0.0521271),
      0px 6.38599px 10.2342px rgba(0, 0, 0, 0.04),
      0px 2.30969px 3.45191px rgba(0, 0, 0, 0.0278729);
    border-radius: 36px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    left: calc(100% + 18px);
    cursor: pointer;
    .search_i {
      font-size: 60px;
      margin-bottom: 31px;
    }
    p {
      font-weight: 700;
      font-size: 26px;
    }
  }
`;
