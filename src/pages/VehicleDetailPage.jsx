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
  position: relative;
  margin: 50px auto;
  @media (max-width: 767px) {
    margin: 50px auto;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 50px auto;
    background: #fff;
    width: 100%;
  }
`;

const StDetailLeftSection = styled.div`
  /* display: inline-block;
    width: calc(100% - 360px);
    vertical-align: top; */
  width: 60%;
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }
`;

const StDetailRightSection = styled.div`
  @media (min-width: 1200px) {
    position: sticky;
    bottom: 9em;
    display: flex;
    flex-direction: row-reverse;
    float: right;
    width: 38%;
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
