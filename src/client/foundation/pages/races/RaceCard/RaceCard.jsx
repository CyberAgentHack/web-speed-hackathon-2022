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
        <PlayerPictureList.Item key={race?.entries[0].key} entry={race?.entries[0]} />
        <PlayerPictureList.Item key={race?.entries[1].key} entry={race?.entries[1]} />
        <PlayerPictureList.Item key={race?.entries[2].key} entry={race?.entries[2]} />
        <PlayerPictureList.Item key={race?.entries[3].key} entry={race?.entries[3]} />
        <PlayerPictureList.Item key={race?.entries[4].key} entry={race?.entries[4]} />
        <PlayerPictureList.Item key={race?.entries[5].key} entry={race?.entries[5]} />
        <PlayerPictureList.Item key={race?.entries[6].key} entry={race?.entries[6]} />
      </PlayerPictureList>

      <Spacer mt={Space * 4} />
      <EntryTable race={race} />
    </>
  );
};
