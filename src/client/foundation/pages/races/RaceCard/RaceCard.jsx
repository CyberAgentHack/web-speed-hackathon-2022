import React from "react";
import { useOutletContext } from "react-router-dom";

import { Spacer } from "../../../components/layouts/Spacer";
import { Space } from "../../../styles/variables";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

/** @type {React.VFC} */
export const RaceCard = () => {
  const { data } = useOutletContext();

  if (data == null) {
    return null;
  }

  return (
    <>
        <PlayerPictureList>
          {data.entries.map((entry) => (
            <PlayerPictureList.Item
              key={entry.id}
              image={entry.player.image}
              name={entry.player.name}
              number={entry.number}
            />
          ))}
        </PlayerPictureList>

        <Spacer mt={Space * 4} />
        <EntryTable entries={data.entries} />
      </>
  );
};
