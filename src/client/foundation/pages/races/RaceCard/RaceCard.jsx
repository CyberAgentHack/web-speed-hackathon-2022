import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";

import { EntryTable } from "./internal/EntryTable";
import { PlayerPictureList } from "./internal/PlayerPictureList";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

/** @type {React.VFC} */
export default function RaceCard () {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  if (data == null) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data?data.name:'title'}</Heading>
      <p>
        開始 {formatTime(data?data.startAt:'0:00')} 締切 {formatTime(data?data.closeAt:'0:00')}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <img src={data?data.image.substring(0,data.image.length-4)+'-live.webp':''} style={{aspectRatio:"400/225"}} width={400} />
      </Section>

      <Spacer mt={Space * 2} />

      <Section>
        <TabNav>
          <TabNav.Item aria-current to={`/races/${raceId}/race-card`}>
            出走表
          </TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 2} />
        <PlayerPictureList>
          {data?data.entries.map((entry) => (
            <PlayerPictureList.Item
              key={entry.id}
              image={entry.player.image.substring(0,entry.player.image.length-3)+'webp'}
              name={entry.player.name}
              number={entry.number}
            />
          )):<></>}
        </PlayerPictureList>

        <Spacer mt={Space * 4} />
        {data?<EntryTable entries={data.entries} />:<></>}
      </Section>
    </Container>
  );
};
