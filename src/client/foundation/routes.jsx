import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { Footer } from "./components/navs/Footer";
import { Header } from "./components/navs/Header";
import { Top } from "./pages/Top";
import { RaceHome } from "./pages/races";

const renderMultiRoutes = ({ element: Element, paths, ...rest }) =>
  paths.map((path) => (
    <Route key={path} path={path} {...rest} element={Element} />
  ));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <React.Fragment>
      <Header />
      <RouterRoutes>
        <Route index element={<Top />} />
        <Route element={<Top />} path=":date" />
        <Route path="races/:raceId">
          {renderMultiRoutes({
            element: <RaceHome />,
            paths: ["race-card", "odds", "result"],
          })}
        </Route>
      </RouterRoutes>
      <Footer />
    </React.Fragment>
  );
};
