// eslint-disable-next-line

import React from "react";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";
import GlobalLayout from "../global/GlobalLayout";
import Desc from "../components/main/Desc";

const HomePage = () => {
  return (
    <>
      <Header />
      <Search />
      <GlobalLayout>
        <Desc />
      </GlobalLayout>
    </>
  );
};

export default HomePage;
