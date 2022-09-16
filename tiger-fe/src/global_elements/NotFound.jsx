// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import NotFoundLogo from "../assets/search_page_logo.png";

const NotFound = (props) => {
  return (
    <StNotFoundContainer>
      <div className="warning">
        <div className="warning__textUpper"> {props.upperText} </div>
        <div className="warning__textLower"> {props.lowerText} </div>
      </div>
      <img src={NotFoundLogo} alt="NotFoundLogo" />
    </StNotFoundContainer>
  );
};

const StNotFoundContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  .warning {
    position: relative;
    top: 230px;
    &__textUpper {
      font-weight: 600;
      font-size: 30px;
      line-height: 41px;
      letter-spacing: 0.02em;
      color: #4d4d4d;
    }
    &__textLower {
      font-weight: 600;
      font-size: 22px;
      line-height: 30px;
      color: #8b8b8b;
    }
  }
  img {
    width: 335px;
    height: 400px;
  }
`;

export default NotFound;
