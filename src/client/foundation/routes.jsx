import React, { lazy, Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";

const Top = lazy(()=>import('./pages/Top/Top'))
const Odds = lazy(()=>import('./pages/races/Odds/Odds'))
const RaceCard = lazy(()=>import('./pages/races/RaceCard/RaceCard'))
const RaceResult = lazy(()=>import('./pages/races/RaceResult/RaceResult'))

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        
          <Route index element={<Suspense fallback={<div style={{height:"100vh"}}>loading...</div>}><Top /></Suspense>} />
          <Route element={<Suspense fallback={<div style={{height:"100vh"}}>loading...</div>}><Top /></Suspense>} path=":date" />
          <Route path="races/:raceId">
            <Route element={<Suspense fallback={<div style={{height:"100vh"}}>loading...</div>}><RaceCard /></Suspense>} path="race-card" />
            <Route element={<Suspense fallback={<div style={{height:"100vh"}}>loading...</div>}><Odds /></Suspense>} path="odds" />
            <Route element={<Suspense fallback={<div style={{height:"100vh"}}>loading...</div>}><RaceResult /></Suspense>} path="result" />
          </Route>
      </Route>
    </RouterRoutes>
  );
};
