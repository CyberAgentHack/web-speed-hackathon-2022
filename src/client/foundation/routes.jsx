import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
import { NoContentContainer } from "./layouts/NoContentContainer";
import Top from "./pages/Top";
const RacePage = React.lazy(() => import("./pages/races/RacePage"));
/** @type {React.VFC} */
export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route index element={<Top />} />
        <Route element={<Top />} path=":date" />
        <Route path="races/:raceId">
          <Route
            element={
              <React.Suspense
                fallback={<NoContentContainer></NoContentContainer>}
              >
                <RacePage />
              </React.Suspense>
            }
            path="race-card"
          />
          <Route
            element={
              <React.Suspense
                fallback={<NoContentContainer></NoContentContainer>}
              >
                <RacePage />
              </React.Suspense>
            }
            path="odds"
          />
          <Route
            element={
              <React.Suspense
                fallback={<NoContentContainer></NoContentContainer>}
              >
                <RacePage />
              </React.Suspense>
            }
            path="result"
          />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
