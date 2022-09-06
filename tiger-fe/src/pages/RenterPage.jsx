// eslint-disable-next-line

import React from "react";

import Header from "../global_elements/Header";
import RenterNavbar from "../components/renter/RenterNavbar";
import GlobalLayout from "../global/GlobalLayout";

const RenterPage = () => {
  return (
    <div>
      <Header />
      <RenterNavbar />
      <GlobalLayout></GlobalLayout>
    </div>
  );
};

export default RenterPage;
