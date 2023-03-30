import ReactDOM from "react-dom/client";
import "./index.scss";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app";
import store from "./components/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);