import "side-effects";
import { AuthContextProvider } from "foundation/contexts/AuthContext";
import CommonLayout from "foundation/pages/CommonLayout";
import { GlobalStyle } from "foundation/styles/GlobalStyle";
import { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import React from "react";
import { StyleSheetManager } from "styled-components";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CyberTicket</title>
      </Head>
      <StyleSheetManager disableCSSOMInjection>
        <AuthContextProvider>
          <CommonLayout>
            {getLayout(<Component {...pageProps} />)}
          </CommonLayout>
        </AuthContextProvider>
      </StyleSheetManager>
    </>
  );
};
export default App;
