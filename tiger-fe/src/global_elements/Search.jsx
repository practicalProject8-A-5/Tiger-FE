// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

import SearchDates from "../components/search/SearchDates";
import SearchLocation from "../components/search/SearchLocation";
import SearchType from "../components/search/SearchType";

const Search = () => {
  return (
    <StSearch>
      <div className="wrap">
        <SearchLocation />
        <SearchDates />
        <SearchType />
      </div>
    </StSearch>
  );
};

export default Search;

const StSearch = styled.div`
  width: 100%;
  height: 93px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.06),
    0px 10px 12px rgba(0, 0, 0, 0.0456112),
    0px 12.5216px 10px rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: space-between;
  padding: 0 246px;
  box-sizing: border-box;
  /* background-color: skyblue; */
  .wrap {
    width: 1411px;
    /* background-color: pink; */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
