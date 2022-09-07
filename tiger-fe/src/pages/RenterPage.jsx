// eslint-disable-next-line

import React, { useState, useEffect } from "react";

import styled, { css } from "styled-components";

import Header from "../global_elements/Header";
import RenterNavbar from "../components/renter/RenterNavbar";
import GlobalLayout from "../global/GlobalLayout";

import ReservedList from "../components/renter/ReservedList";
import RentedList from "../components/renter/RentedList";
import LoadingList from "../components/renter/LoadingList";
import RenterRefund from "../components/renter/RenterRefund";

const RenterPage = () => {
  // const [isClicked, setIsClicked] = useState(false);
  // const [isRented, setIsRented] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRefund, setIsRefund] = useState(false);

  return (
    <div>
      <Header />
      <RenterNavbar></RenterNavbar>
      <GlobalLayout></GlobalLayout>
    </div>
  );
};

export default RenterPage;
