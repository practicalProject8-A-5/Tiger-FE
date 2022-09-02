// eslint-disable-next-line

import React from "react";

import Header from "../global_elements/Header";
import GlobalLayout from "../global/GlobalLayout";
import Search from "../global_elements/Search";

const RenterPage = () => {
  return (
    <div>
      <Header />
      <Search />
      <GlobalLayout>renter</GlobalLayout>
    </div>
  );
};

export default RenterPage;
