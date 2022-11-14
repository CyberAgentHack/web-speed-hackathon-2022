import { Container } from "foundation/components/layouts/Container";
import { Spacer } from "foundation/components/layouts/Spacer";
import { useFetch } from "foundation/hooks/useFetch";

import EntryTable from "foundation/pages/races/RaceCard/EntryTable";
import PlayerPictureList from "foundation/pages/races/RaceCard/PlayerPictureList";
import { RaceInfo, RaceTabNavContents } from "foundation/pages/races/RaceLayout";
import { Space } from "foundation/styles/variables";
import { ArrayResponse } from "foundation/types";
import { jsonFetcher } from "foundation/utils/HttpUtils";
import { GetServerSideProps, NextPageWithLayout } from "next";
import React from "react";
import { Race, RaceEntry } from "../../../../model";

type RaceCardProps = {
  race: Race;
};

export const getServerSideProps: GetServerSideProps<RaceCardProps> = (async ({ res, query }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=31536000, stale-while-revalidate'
  )

  const { raceId } = query;
  const race = await jsonFetcher<Race>(`/api/races/${raceId}`);

  return {
    props: { race },
  };
})

const RaceCard: NextPageWithLayout<RaceCardProps> = ({ race }) => {

  const { data: entries } = useFetch<ArrayResponse<RaceEntry>>(`/api/races/${race.id}/entries`, jsonFetcher)

  return (
    <Container>
      <RaceInfo race={race} />
      <RaceTabNavContents race={race}>
        <Spacer mt={Space * 2} />

        <PlayerPictureList>
          {(entries?.items ?? []).map((entry) => <PlayerPictureList.Item key={entry.id} entry={entry} />)}
        </PlayerPictureList>

        <Spacer mt={Space * 4} />
        <EntryTable entries={entries?.items ?? []} />
      </RaceTabNavContents>
    </Container>
  );
};
export default RaceCard;
