import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
import { Top } from "./pages/Top";
import { RacePage } from "./pages/races/RacePage";

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route index element={<Top />} />
        <Route element={<Top />} path=":date" />
        <Route path="races/:raceId">
          <Route element={<RacePage />} path="race-card" />
          <Route element={<RacePage />} path="odds" />
          <Route element={<RacePage />} path="result" />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
