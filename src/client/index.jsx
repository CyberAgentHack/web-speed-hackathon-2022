import React from "react";
import ReactDOM from "react-dom";

import { App } from "./foundation/App";

const root = document.getElementById("root");
ReactDOM.render(<App />, root);

requestIdleCallback(() => {
  const $font = document.createElement("link");
  $font.rel = "stylesheet";
  $font.href = "/styles/foundation/font.css";
  document.head.append($font);
});
