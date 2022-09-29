// eslint-disable-next-line

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import ReactGA from "react-ga";
import { persistor, store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// const Google_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
// ReactGA.initialize(Google_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>
);
