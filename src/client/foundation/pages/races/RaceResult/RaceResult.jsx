import React from "react";
import { useOutletContext } from "react-router-dom";

import { Spacer } from "../../../components/layouts/Spacer";
import { Heading } from "../../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../../hooks/useAuthorizedFetch";
import { Space } from "../../../styles/variables";
import { authorizedJsonFetcher } from "../../../utils/HttpUtils";

import { BettingTicketList } from "./internal/BettingTicketList";
import { RaceResultSection } from "./internal/RaceResultSection";

/** @type {React.VFC} */
export const RaceResult = () => {
  const { raceId } = useOutletContext();
  const { data: ticketData } = useAuthorizedFetch(`/api/races/${raceId}/betting-tickets`, authorizedJsonFetcher);

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
