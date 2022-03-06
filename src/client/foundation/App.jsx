import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

import { Footer } from "./components/navs/Footer";
import { Header } from "./components/navs/Header";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";

/** @type {React.VFC} */
export const App = () => {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes />
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </StyleSheetManager>
  );
};
