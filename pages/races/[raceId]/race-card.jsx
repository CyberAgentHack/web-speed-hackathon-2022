import React from "react";

import { Spacer } from "@/foundation/components/layouts/Spacer";
import { Space } from "@/foundation/styles/variables";

import EntryTable from "@/foundation/pages/races/RaceCard/EntryTable";
import PlayerPictureList from "@/foundation/pages/races/RaceCard/PlayerPictureList";
import RaceLayout from "@/foundation/pages/races/RaceLayout";
import { useRouter } from "next/router";

/** @type {React.VFC} */
export default function RaceCard() {
  const router = useRouter();
  const { raceId } = router.query;
  // TODO
  // const { race } = useOutletContext();
  const race = null;

  return (
    <>
      <Spacer mt={Space * 2} />

      <PlayerPictureList>
        {(race?.entries ?? []).map((entry) => <PlayerPictureList.Item key={entry.id} entry={entry} />)}
      </PlayerPictureList>

      <Spacer mt={Space * 4} />
      <EntryTable race={race} />
    </>
  );
}

RaceCard.getLayout = function getLayout(page) {
  return (
    <RaceLayout>
      {page}
    </RaceLayout>
  );
};
