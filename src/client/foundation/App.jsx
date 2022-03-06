import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";

const queryClient = new QueryClient();

/** @type {React.VFC} */
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleSheetManager disableCSSOMInjection>
        <AuthContextProvider>
          <GlobalStyle />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthContextProvider>
      </StyleSheetManager>
    </QueryClientProvider>
  );
};
