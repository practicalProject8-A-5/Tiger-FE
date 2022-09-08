// eslint-disable-next-line

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const KakaoLogin = () => {
  const memberApi = process.env.REACT_APP_MEMBER;
  const navigate = useNavigate();

  // 카카오버튼 클릭시 생겨난 url를 잡아온다
  const location = useLocation();

  // url 1번재 "=" 뒤에 있는 인가코드를 잡아온다
  const kakaoCode = location.search.split("=")[1];

  const postCode = async () => {
    try {
      const response = await axios.get(
        memberApi + `/member/login?code=${kakaoCode}`,
        {
          // 백엔드 보내기.
        }
      );
      localStorage.setItem("userToken", response.headers.authorization);
      localStorage.setItem("email", response.data.output.email);
      localStorage.setItem("phone", response.data.output.tel);
      localStorage.setItem("name", response.data.output.name);
      localStorage.setItem("refreshToken", response.headers.refreshtoken);
      // console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    postCode();
  }, []);
  return <div></div>;
};

export default KakaoLogin;
