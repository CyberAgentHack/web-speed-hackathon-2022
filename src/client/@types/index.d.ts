import type { NextPage, NextPageWithLayout } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

declare module "next" {
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P & { children?: ReactNode }, IP> & {
    getLayout?: (page: ReactElement) => ReactElement;
  };
}

declare module "next/app" {
  export type AppPropsWithLayout<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout<P>;
  };
}
