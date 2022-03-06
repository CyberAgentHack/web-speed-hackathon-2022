import React, { Suspense, lazy, memo } from "react";

import { Stack } from "../../../../components/layouts/Stack";
import { Space } from "../../../../styles/variables";

const RecentRaceListItem = lazy(() => import("./RecentRaceListItem"));

export const RecentRaceList = memo(({ todayRacesToShow }) => (
  <Stack as="ul" gap={Space * 2}>
    <Suspense fallback={null}>
      {todayRacesToShow.map((race) => (
        <RecentRaceListItem key={race.id} race={race} />
      ))}
    </Suspense>
  </Stack>
));
