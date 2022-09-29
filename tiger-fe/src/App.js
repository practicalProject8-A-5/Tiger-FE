// eslint-disable-next-line

import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalRouter from "./global/GlobalRouter";
import { loader } from "./redux/modules/memberSlice";
import "./App.css";
// import ReactGA from "react-ga";

// ReactGA.event({
//   category: "User",
//   action: "Created an Account",
// });
// ReactGA.exception({
//   description: "An error ocurred",
//   fatal: true,
// });

function App() {
  const dispatch = useDispatch();
  // const locations = useLocation();

  useEffect(() => {
    dispatch(loader());
  }, [dispatch]);

  // useEffect(() => {
  //   ReactGA.initialize("user id");
  //   locations.listen((location) => {
  //     ReactGA.set({ page: location.pathname }); // Update the user's current page
  //     ReactGA.pageview(location.pathname); // Record a pageview for the given page
  //   });
  //   // ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);

  return (
    <BrowserRouter>
      <GlobalRouter />
    </BrowserRouter>
  );
}

export default App;
