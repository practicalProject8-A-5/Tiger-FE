// eslint-disable-next-line

import React from "react";

import GlobalRouter from "./global/GlobalRouter";
import Header from "./global_elements/Header";
import Search from "./global_elements/Search";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Search />
      <GlobalRouter />
    </>
  );
}

export default App;
