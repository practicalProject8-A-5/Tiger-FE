// eslint-disable-next-line

import React from "react";
import styled from "styled-components";

import VehicleImgSwiper from "../components/vehicle_detail/VehicleImgSwiper";
import Payment from "../components/payment/Payment";

const VehicleDetailPage = () => {
  return (
    <StDetailContainer>
      <StDetailLeftSection>
        <VehicleImgSwiper />
      </StDetailLeftSection>
      <StDetailRightSection>
        <Payment />
      </StDetailRightSection>
    </StDetailContainer>
  );
};

const StDetailContainer = styled.div`
  @media (min-width: 1200px) {
    /* max-width: 1060px; */
    /* height: 100vh;
    padding: 20px 0 80px; */
    position: relative;
    margin: 50px auto;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    background: #fff;
    margin-top: 70px;
    margin: 0 auto;
    padding: 20px 0 80px;
    width: 90%;
  }
  @media (max-width: 767px) {
    margin: 72px auto;
    padding: 20px 0 0px;
    width: 90%;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    margin: 0 auto;
    padding: 20px 0 80px;
    width: 90%;
  }
`;

const StDetailLeftSection = styled.div`
  @media (min-width: 1200px) {
    display: inline-block;
    width: calc(100% - 360px);
    vertical-align: top;
  }
`;

const StDetailRightSection = styled.div`
  @media (min-width: 1200px) {
    top: 70px;
    position: fixed;
    right: calc((100% - 1060px) / 2);
  }
  @media (min-width: 768px) and (max-width: 991px) {
    bottom: 0;
    width: 100%;
  }
  @media (max-width: 767px) {
    bottom: 0;
    width: 100%;
  }
`;

export default VehicleDetailPage;
