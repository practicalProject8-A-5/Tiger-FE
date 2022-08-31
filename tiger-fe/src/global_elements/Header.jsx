// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

import SearchVehicle from "../components/search/SearchVehicle";

const Header = () => {
  return (
    <StHeader>
      <div className="wrap">
        <div className="logo">logo</div>
        <div className="search">
          <SearchVehicle />
        </div>
        <div className="menu">
          <p className="reservation_list">예약내역</p>
          <p className="host_mode">차주 등록하기</p>
          <p className="user_profile">img</p>
          <p className="ham_btn">햄</p>
        </div>
      </div>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 114px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  .wrap {
    width: 1467px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    display: flex;
    background-color: pink;
    .logo {
      width: 85px;
      background-color: yellowgreen;
    }
    .search {
      width: 530px;
      height: 46px;
      background-color: skyblue;
      border: 1px solid;
      border-radius: 4px;
    }
    .menu {
      display: flex;
      gap: 15px;
      align-items: center;
      border: 1px solid;
      box-sizing: border-box;

      .reservation_list {
        background-color: yellowgreen;
      }
      .user_profile {
        width: 31px;
        height: 31px;
        background-color: tomato;
      }
      .host_mode {
        /* width: 31px;
        height: 31px; */
        background-color: royalblue;
      }
      .ham_btn {
        width: 34px;
        height: 34px;
        background-color: yellow;
      }
    }
  }
`;
