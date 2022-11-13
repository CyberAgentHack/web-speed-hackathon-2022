import { Container } from "foundation/components/layouts/Container";
import { Spacer } from "foundation/components/layouts/Spacer";
import { useFetch } from "foundation/hooks/useFetch";

import EntryTable from "foundation/pages/races/RaceCard/EntryTable";
import PlayerPictureList from "foundation/pages/races/RaceCard/PlayerPictureList";
import { RaceInfo, RaceTabNavContents } from "foundation/pages/races/RaceLayout";
import { Space } from "foundation/styles/variables";
import { jsonFetcher } from "foundation/utils/HttpUtils";
import { GetServerSideProps, NextPageWithLayout } from "next";
import React from "react";
import { Race } from "../../../../model";

type RaceCardProps = {
  raceId: string;
};

export const getServerSideProps: GetServerSideProps<RaceCardProps> = async ({ query }) => {
  const { raceId } = query;

  return {
    props: { raceId : raceId as string },
  };
};

const RaceCard: NextPageWithLayout<RaceCardProps> = ({ raceId }) => {
  const { data: race } = useFetch<Race>(`/api/races/${raceId}`, jsonFetcher);

  return (
    <Container>
      <RaceInfo race={race} />
      <RaceTabNavContents race={race}>
        <Spacer mt={Space * 2} />

        <PlayerPictureList>
          {(race?.entries ?? []).map((entry) => <PlayerPictureList.Item key={entry.id} entry={entry} />)}
        </PlayerPictureList>

        <Spacer mt={Space * 4} />
        <EntryTable race={race} />
      </RaceTabNavContents>
    </Container>
  );
};
export default RaceCard;
