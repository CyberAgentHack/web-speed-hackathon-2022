import { AuthContextProvider } from "foundation/contexts/AuthContext";
import CommonLayout from "foundation/pages/CommonLayout";
import { GlobalStyle } from "foundation/styles/GlobalStyle";
import { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import "side-effects";
import { StyleSheetManager } from "styled-components";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <StyleSheetManager disableCSSOMInjection>
      <AuthContextProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CyberTicket</title>
        </Head>
        <GlobalStyle />
        <RecoilRoot>
          <CommonLayout>
            {getLayout(<Component {...pageProps} />)}
          </CommonLayout>
        </RecoilRoot>
      </AuthContextProvider>
    </StyleSheetManager>
  );
};
export default App;
