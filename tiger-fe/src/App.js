// eslint-disable-next-line

import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { useState } from "react";

import GlobalRouter from "./global/GlobalRouter";

import "./App.css";
import GlobalLayout from "./global/GlobalLayout";

function App() {
  return (
    <BrowserRouter>
      <GlobalRouter />
    </BrowserRouter>
  );
}

export default App;
