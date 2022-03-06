import React from "react";

import { Footer } from "../../components/navs/Footer";
import { Header } from "../../components/navs/Header/Header";

/** @type {React.FC<Props>} */
export const CommonLayout = ({ children }) => {
  return (
    <div>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
};
