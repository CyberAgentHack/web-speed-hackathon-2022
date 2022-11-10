import "side-effects";
import type { AppProps } from "next/app";
import CommonLayout from "foundation/pages/CommonLayout";
import Head from "next/head";
import { StyleSheetManager } from "styled-components";
import { AuthContextProvider } from "foundation/contexts/AuthContext";
import { GlobalStyle } from "foundation/styles/GlobalStyle";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CyberTicket</title>
        </Head>
        <GlobalStyle />
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </AuthContextProvider>
    </StyleSheetManager>
  );
}
