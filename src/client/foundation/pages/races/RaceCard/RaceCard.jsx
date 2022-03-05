import React from "react";
import { useParams } from "react-router-dom";

import { Container } from "../../../components/layouts/Container";
import { Spacer } from "../../../components/layouts/Spacer";
import { useFetch } from "../../../hooks/useFetch";
import { Space } from "../../../styles/variables";
import { jsonFetcher } from "../../../utils/HttpUtils";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

/** @type {React.VFC} */
export const RaceCard = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  if (data == null) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <Spacer mt={Space * 2} />
      <PlayerPictureList>
        {data.entries.map((entry) => (
          <PlayerPictureList.Item
            key={entry.id}
            image={entry.player.image.split(".jpg")[0] + "_sq.webp"}
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
