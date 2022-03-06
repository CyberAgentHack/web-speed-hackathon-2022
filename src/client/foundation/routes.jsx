import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { Top } from "./pages/Top";
import { RaceHome } from "./pages/races";

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Top />} />
      <Route element={<Top />} path=":date" />
      <Route path="races/:raceId">
        <Route element={<RaceHome />} path="race-card" />
        <Route element={<RaceHome />} path="odds" />
        <Route element={<RaceHome />} path="result" />
      </Route>
    </RouterRoutes>
  );
};
