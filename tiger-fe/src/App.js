// eslint-disable-next-line

import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalRouter from "./global/GlobalRouter";
import Header from "./global_elements/Header";
import Search from "./global_elements/Search";

import "./App.css";
import GlobalLayout from "./global/GlobalLayout";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Search />
      <GlobalLayout>
        <GlobalRouter />
      </GlobalLayout>
    </BrowserRouter>
  );
}

export default App;
