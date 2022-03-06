import React, { Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
import { RaceLayout } from "./layouts/RaceLayout";
// import { Top } from "./pages/Top";
// import { Odds } from "./pages/races/Odds";
// import { RaceCard } from "./pages/races/RaceCard";
// import { RaceResult } from "./pages/races/RaceResult";

const Top = React.lazy(() => import("./pages/Top"));
const Odds = React.lazy(() => import("./pages/races/Odds"));
const RaceCard = React.lazy(() => import("./pages/races/RaceCard"));
const RaceResult = React.lazy(() => import("./pages/races/RaceResult"));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route
          index
          element={
            <Suspense fallback={<div>loading</div>}>
              <Top />
            </Suspense>
          }
        />
        <Route
          element={
            <Suspense fallback={<div>loading</div>}>
              <Top />
            </Suspense>
          }
          path=":date"
        />
        <Route
          element={
            <Suspense fallback={<div>loading</div>}>
              <RaceLayout />
            </Suspense>
          }
          path="races/:raceId"
        >
          <Route
            element={
              <Suspense fallback={<div>loading</div>}>
                <RaceCard />
              </Suspense>
            }
            path="race-card"
          />
          <Route
            element={
              <Suspense fallback={<div>loading</div>}>
                <Odds />
              </Suspense>
            }
            path="odds"
          />
          <Route
            element={
              <Suspense fallback={<div>loading</div>}>
                <RaceResult />
              </Suspense>
            }
            path="result"
          />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
