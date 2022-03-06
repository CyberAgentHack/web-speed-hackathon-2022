import "./foundation/side-effects";

import React from "react";
import { render } from "react-dom";

import { App } from "./foundation/App";

const root = document.createElement("div");

document.body.appendChild(root);

render(<App />, root);
