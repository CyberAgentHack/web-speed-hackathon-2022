import "@/foundation/side-effects";
import "@/foundation/styles/GlobalStyle";
import type { AppProps } from "next/app";
import CommonLayout from "@/foundation/pages/CommonLayout";
import { StyleSheetManager } from "styled-components";
import { AuthContextProvider } from "@/foundation/contexts/AuthContext";
import { GlobalStyle } from "@/foundation/styles/GlobalStyle";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <GlobalStyle />
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </AuthContextProvider>
    </StyleSheetManager>
  );
}
