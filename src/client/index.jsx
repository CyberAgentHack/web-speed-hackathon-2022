import "./foundation/side-effects";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./foundation/App";

const root = document.getElementById("root");
ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root,
);
