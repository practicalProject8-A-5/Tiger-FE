// eslint-disable-next-line

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalRouter from "./global/GlobalRouter";
import { loader } from "./redux/modules/memberSlice";
import "./App.css";

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
