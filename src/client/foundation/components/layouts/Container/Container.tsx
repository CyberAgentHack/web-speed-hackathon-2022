import { NextPageWithLayout } from "next";
import React from "react";

import styles from "./Container.module.scss"

export const Container: NextPageWithLayout = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};
