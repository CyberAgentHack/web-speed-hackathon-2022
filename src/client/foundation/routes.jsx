import * as React from "react";
import loadable from '@loadable/component'
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { CommonLayout } from "./layouts/CommonLayout";

const Top = loadable(() => import("./pages/Top"), {
  resolveComponent: (Top) => Top.Top,
})
const Odds = loadable(() => import("./pages/races/Odds"), {
  resolveComponent: (Odds) => Odds.Odds,
})
const RaceCard = loadable(() => import("./pages/races/RaceCard"), {
  resolveComponent: (RaceCard) => RaceCard.RaceCard, 
})
const RaceResult = loadable(() => import("./pages/races/RaceResult"), {
  resolveComponent: (RaceResult) => RaceResult.RaceResult,
})

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route index element={<Top />} />
        <Route element={<Top />} path=":date" />
        <Route path="races/:raceId">
          <Route element={<RaceCard />} path="race-card" />
          <Route element={<Odds />} path="odds" />
          <Route element={<RaceResult />} path="result" />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
