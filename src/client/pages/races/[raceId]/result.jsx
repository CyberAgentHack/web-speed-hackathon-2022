import React from "react";

import { Spacer } from "foundation/components/layouts/Spacer";
import { Heading } from "foundation/components/typographies/Heading";
import { Space } from "foundation/styles/variables";
import { authorizedJsonFetcher, jsonFetcher } from "foundation/utils/HttpUtils";

import BettingTicketList from "foundation/pages/races/RaceResult/BettingTicketList";
import RaceResultSection from "foundation/pages/races/RaceResult/RaceResultSection";
import { RaceInfo, RaceTabNavContents } from "foundation/pages/races/RaceLayout";
import { useAuthorizedFetch } from "../../../foundation/hooks/useAuthorizedFetch";
import { Container } from "../../../foundation/components/layouts/Container";
import { useFetch } from "../../../foundation/hooks/useFetch";

export const getServerSideProps = async ({ query }) => {
  const { raceId } = query;

  return {
    props: { raceId },
  };
};

/** @type {NextPageWithLayout} */
export default function Result({ raceId }) {

  const { data: race } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  const { data: bettingTickets } = useAuthorizedFetch(`/api/races/${raceId}/betting-tickets`, authorizedJsonFetcher);

  return (
    <Container>
      <RaceInfo race={race} />
      <RaceTabNavContents race={race}>
        <Spacer mt={Space * 4} />

        <Heading as="h2">購入した買い目</Heading>

        <Spacer mt={Space * 2} />
        <BettingTicketList>
          {(bettingTickets ?? []).map((ticket) => <BettingTicketList.Item key={ticket.id} ticket={ticket} />)}
        </BettingTicketList>

        <Spacer mt={Space * 4} />
        <Heading as="h2">勝負結果</Heading>

        <Spacer mt={Space * 2} />

        <RaceResultSection />
      </RaceTabNavContents>
    </Container>
  );
}