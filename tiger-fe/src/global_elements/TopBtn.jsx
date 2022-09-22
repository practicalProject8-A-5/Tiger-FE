import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import topBtn from "../assets/home_image/top_button_icon.png";

const TopBtn = () => {
  // console.log(window.scrollY);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleShowBtn = () => {
      if (window.scrollY > 400) {
        setShowBtn(!showBtn);
      } else {
        setShowBtn(showBtn);
      }
    };

    window.addEventListener("scroll", handleShowBtn);
    return () => {
      window.removeEventListener("scroll", handleShowBtn);
    };
  }, []);

  return (
    showBtn && (
      <StTopBtn onClick={scrollToTop}>
        <img src={topBtn} alt="top" />
      </StTopBtn>
    )
  );
};

export default TopBtn;
const StTopBtn = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffb979;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  right: 249px;
  bottom: 50px;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
  cursor: pointer;
`;
