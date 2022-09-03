// eslint-disable-next-line

import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalRouter from "./global/GlobalRouter";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalRouter />
    </BrowserRouter>
  );
}

export default App;
