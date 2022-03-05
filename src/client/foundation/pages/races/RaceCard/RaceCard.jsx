import React from "react";
import { useOutletContext } from "react-router-dom";

import { Spacer } from "../../../components/layouts/Spacer";
import { Space } from "../../../styles/variables";
import { defaultEntries } from "../../../utils/DummyData";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

/** @type {React.VFC} */
export const RaceCard = () => {
  const data = useOutletContext().raceDetail;

  return (
    <>
      <Spacer mt={Space * 2} />
      <PlayerPictureList>
        {data == null
          ? Array(12)
              .fill(null)
              .map((_, i) => (
                <PlayerPictureList.Item
                  key={i}
                  image={""}
                  name={"■■■■"}
                  number={i}
                />
              ))
          : data.entries.map((entry) => (
              <PlayerPictureList.Item
                key={entry.id}
                image={entry.player.image.split(".jpg")[0] + "_sq.webp"}
                name={entry.player.name}
                number={entry.number}
              />
            ))}
      </PlayerPictureList>

      <Spacer mt={Space * 4} />
      {data == null ? (
        <EntryTable entries={defaultEntries} />
      ) : (
        <EntryTable entries={data.entries} />
      )}
    </>
  );
};
