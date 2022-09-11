// eslint-disable-next-line

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { __kakaoLogin } from "../../redux/modules/memberSlice.js";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(__kakaoLogin(code));
    // postCode();
    navigate("/");
  }, [dispatch]);

  return (
    <KakaoLoadingContainer>
      <CircularProgress />
    </KakaoLoadingContainer>
  );
};

const KakaoLoadingContainer = styled.div`
  display: block;
  margin: 18% auto;
  text-align: center;
`;

export default KakaoLogin;
