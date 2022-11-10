import React from "react";

import { Spacer } from "@/foundation/components/layouts/Spacer";
import { Heading } from "@/foundation/components/typographies/Heading";
import { useAuthorizedFetch } from "@/foundation/hooks/useAuthorizedFetch";
import { Space } from "@/foundation/styles/variables";
import { authorizedJsonFetcher } from "@/foundation/utils/HttpUtils";

import BettingTicketList from "@/foundation/pages/races/RaceResult/BettingTicketList";
import RaceResultSection from "@/foundation/pages/races/RaceResult/RaceResultSection";
import { useRouter } from "next/router";
import RaceLayout from "@/foundation/pages/races/RaceLayout";

/** @type {React.VFC} */
export default function RaceResult() {
  const router = useRouter();
  const { raceId } = router.query;

  const { data: ticketData } = useAuthorizedFetch(`/api/races/${raceId}/betting-tickets`, authorizedJsonFetcher);

  return (
    <>
      <Spacer mt={Space * 4} />

      <Heading as="h2">購入した買い目</Heading>

      <Spacer mt={Space * 2} />
      <BettingTicketList>
        {(ticketData?.bettingTickets ?? []).map((ticket) => <BettingTicketList.Item key={ticket.id} ticket={ticket} />)}
      </BettingTicketList>

      <Spacer mt={Space * 4} />
      <Heading as="h2">勝負結果</Heading>

      <Spacer mt={Space * 2} />
      <RaceResultSection />
    </>
  );
}

RaceResult.getLayout = function getLayout(page) {
  return (
    <RaceLayout>
      {page}
    </RaceLayout>
  );
};
