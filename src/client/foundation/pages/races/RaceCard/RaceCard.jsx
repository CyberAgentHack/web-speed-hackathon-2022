import React from "react";
import { useOutletContext } from "react-router-dom";

import { Spacer } from "../../../components/layouts/Spacer";
import { Space } from "../../../styles/variables";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

/** @type {React.VFC} */
export const RaceCard = () => {
  const { race } = useOutletContext();

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
};
