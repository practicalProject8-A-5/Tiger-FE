// eslint-disable-next-line

import React from "react";
import styled from "styled-components";
import VehicleDetailLeft from "../components/vehicle_detail/VehicleDetailLeft";
import VehicleDetailRight from "../components/vehicle_detail/VehicleDetailRight";
import GlobalLayout from "../global/GlobalLayout";
import Footer from "../global_elements/Footer";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";

const VehicleDetailPage = () => {
  return (
    <>
      <Header />
      <Search />
      <GlobalLayout>
        <StDetailContainer>
          <StDetailLeftSection>
            <VehicleDetailLeft />
          </StDetailLeftSection>
          <StDetailRightSection>
            <VehicleDetailRight />
          </StDetailRightSection>
        </StDetailContainer>
      </GlobalLayout>
      <Footer />
    </>
  );
};

const StDetailContainer = styled.div`
  @media (min-width: 1200px) {
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
    top: 27%;
    position: fixed;
    right: calc((100% - 1396px) / 2);
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
