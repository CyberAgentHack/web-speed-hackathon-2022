import React from "react";
import { useParams } from "react-router-dom";

import { Container } from "../../../components/layouts/Container";
import { Spacer } from "../../../components/layouts/Spacer";
import { Heading } from "../../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../../hooks/useAuthorizedFetch";
import { useFetch } from "../../../hooks/useFetch";
import { Space } from "../../../styles/variables";
import { authorizedJsonFetcher, jsonFetcher } from "../../../utils/HttpUtils";

import { BettingTicketList } from "./internal/BettingTicketList";
import { RaceResultSection } from "./internal/RaceResultSection";

/** @type {React.VFC} */
export const RaceResult = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  const { data: ticketData } = useAuthorizedFetch(
    `/api/races/${raceId}/betting-tickets`,
    authorizedJsonFetcher,
  );

  if (data == null) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <Spacer mt={Space * 4} />
      <Heading as="h2">購入した買い目</Heading>

      <Spacer mt={Space * 2} />
      <BettingTicketList>
        {(ticketData?.bettingTickets ?? []).map((ticket) => (
          <BettingTicketList.Item key={ticket.id} ticket={ticket} />
        ))}
      </BettingTicketList>

      <Spacer mt={Space * 4} />
      <Heading as="h2">勝負結果</Heading>

      <Spacer mt={Space * 2} />
      <RaceResultSection />
    </>
  );
};
