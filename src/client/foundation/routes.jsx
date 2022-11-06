import React, { lazy, Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
import { RaceLayout } from "./pages/races/Layout/RaceLayout";

const Top = lazy(() => import('./pages/Top'))
const Odds = lazy(() => import('./pages/races/Odds'))
const RaceCard = lazy(() => import('./pages/races/RaceCard'))
const RaceResult = lazy(() => import('./pages/races/RaceResult'))

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <Suspense loading="Loading...">
      <RouterRoutes>
        <Route element={<CommonLayout />} path="/">
          <Route index element={<Top />} />
          <Route element={<Top />} path=":date" />
          <Route element={<RaceLayout />} path="races/:raceId">
            <Route element={<RaceCard />} path="race-card" />
            <Route element={<Odds />} path="odds" />
            <Route element={<RaceResult />} path="result" />
          </Route>
        </Route>
      </RouterRoutes>
    </Suspense>
  );
};
