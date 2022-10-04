// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import NotFoundLogo from "../assets/search_page_logo.png";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const navigate = useNavigate();
  const backToMainHandler = () => {
    navigate("/");
  };

  return (
    <>
      <StNotFoundContainer>
        <div className="warning">
          <div className="warning__textUpper"> {props.upperText} </div>
          <div className="warning__textLower"> {props.lowerText} </div>
        </div>
        <img src={NotFoundLogo} alt="NotFoundLogo" loading="lazy" />
        <StBackToMain onClick={backToMainHandler}>
          메인페이지로 이동
        </StBackToMain>
      </StNotFoundContainer>
    </>
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

const StBackToMain = styled.div`
  display: block;
  border: 1px solid white;
  width: 200px;
  height: 50px;
  text-align: center;
  margin: 40px auto;
  line-height: 50px;
  background: #ff881b;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

export default NotFound;
