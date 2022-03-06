import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

// import { CommonLayout } from "./layouts/CommonLayout";
// import { Top } from "./pages/Top";
// import { Odds } from "./pages/races/Odds";
// import { RaceCard } from "./pages/races/RaceCard";
// import { RaceResult } from "./pages/races/RaceResult";

const CommonLayout = React.lazy(() => import("./layouts/CommonLayout"));
const Top = React.lazy(() => import("./pages/Top"))
const Odds = React.lazy(() => import("./pages/races/Odds"))
const RaceCard = React.lazy(() => import("./pages/races/RaceCard"))
const RaceResult = React.lazy(() => import("./pages/races/RaceResult"))

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<React.Suspense fallback={<p></p>} ><CommonLayout /></React.Suspense>} path="/" >
        <Route index element={<React.Suspense fallback={<p></p>} ><Top /></React.Suspense>} />
        <Route element={<React.Suspense fallback={<p></p>} ><Top /></React.Suspense>} path=":date" />
        <Route path="races/:raceId">
          <Route element={<React.Suspense fallback={<p></p>} ><RaceCard /></React.Suspense>} path="race-card" />
          <Route element={<React.Suspense fallback={<p></p>} ><Odds /></React.Suspense>} path="odds" />
          <Route element={<React.Suspense fallback={<p></p>} ><RaceResult /></React.Suspense>} path="result" />
        </Route>
      </Route >
    </RouterRoutes >
  );
};
