import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import Loadable from "react-loadable";
import { Container } from "./components/layouts/Container";

import { CommonLayout } from "./layouts/CommonLayout";
import { Top } from "./pages/Top";

const Odds = Loadable({
  loader: () => import("./pages/races/Odds"),
  loading() {
    return <Container>Loading...</Container>;
  },
});
const RaceCard = Loadable({
  loader: () => import("./pages/races/RaceCard"),
  loading() {
    return <Container>Loading...</Container>;
  },
});
const RaceResult = Loadable({
  loader: () => import("./pages/races/RaceResult"),
  loading() {
    return <Container>Loading...</Container>;
  },
});

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
