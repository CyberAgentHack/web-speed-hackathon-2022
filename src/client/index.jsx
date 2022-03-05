import React from "react";
import ReactDOM from "react-dom";
import "./foundation/side-effects";

// import { App } from "./foundation/App";

const root = document.getElementById("root");
// ReactDOM.render(<App />, root);

import("./foundation/App").then(({ App }) => {
  ReactDOM.render(<App />, root);
});
