import React from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "../components/navs/Footer";
import { Header } from "../components/navs/Header";

export const CommonLayout = () => {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
