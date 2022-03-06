import React from "react";
import { StyleSheetManager } from "styled-components";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";

/** @type {React.VFC} */
export const App = () => {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <GlobalStyle />
        <Routes />
      </AuthContextProvider>
    </StyleSheetManager>
  );
};
