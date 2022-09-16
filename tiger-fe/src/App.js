// eslint-disable-next-line

import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalRouter from "./global/GlobalRouter";
import { loader } from "./redux/modules/memberSlice";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loader());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <GlobalRouter />
    </BrowserRouter>
  );
}

export default App;
