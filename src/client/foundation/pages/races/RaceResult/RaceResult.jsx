import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../../hooks/useAuthorizedFetch";
import { useFetch } from "../../../hooks/useFetch";
import { formatTime } from "../../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../../utils/HttpUtils";

import { BettingTicketList } from "./internal/BettingTicketList";
import { RaceResultSection } from "./internal/RaceResultSection";

const LiveBadge = styled.span`
  background: #ff0000;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  padding: ${8}px;
  text-transform: uppercase;
`;

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
    <Container>
      <Spacer mt={16} />
      <Heading as="h1">{data.name}</Heading>
      <p>
        開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
      </p>

      <Spacer mt={16} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={16} />
        <TrimmedImage height={225} src={data.image} width={400} />
      </Section>

      <Spacer mt={16} />

      <Section>
        <TabNav>
          <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item aria-current to={`/races/${raceId}/result`}>
            結果
          </TabNav.Item>
        </TabNav>

        <Spacer mt={32} />
        <Heading as="h2">購入した買い目</Heading>

        <Spacer mt={16} />
        <BettingTicketList>
          {(ticketData?.bettingTickets ?? []).map((ticket) => (
            <BettingTicketList.Item key={ticket.id} ticket={ticket} />
          ))}
        </BettingTicketList>

        <Spacer mt={32} />
        <Heading as="h2">勝負結果</Heading>

        <Spacer mt={16} />
        <RaceResultSection />
      </Section>
    </Container>
  );
};
