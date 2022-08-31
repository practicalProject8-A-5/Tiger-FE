// eslint-disable-next-line

import React from "react";
import styled, { css } from "styled-components";

const Button = (props) => {
  return (
    <StButton {...props} disabled={props.disabled}>
      {props.children}
    </StButton>
  );
};

const StButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px solid #eee;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)};
  cursor: pointer;
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          width: 100%;
        `;
      case "medium":
        return css`
          width: 80px;
        `;
      case "small":
        return css`
          width: 30px;
          height: 30px !important;
        `;
      default:
        return css`
          width: 120px;
        `;
    }
  }}
`;

export default Button;
