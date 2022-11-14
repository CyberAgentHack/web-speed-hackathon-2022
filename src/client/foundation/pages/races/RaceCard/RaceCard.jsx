import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import {
  PlaceholderSection,
  Section,
} from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
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
export const RaceCard = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1" style={{ height: "3rem", width: "100%" }}>
        {data ? data.name : ""}
      </Heading>
      <p style={{ height: "1.5rem", width: "100%" }}>
        開始 {data ? formatTime(data.startAt) : ""} 締切{" "}
        {data ? formatTime(data.closeAt) : ""}
      </p>

      <Spacer mt={Space * 2} />
      <PlaceholderSection dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage
          height={225}
          src={data ? `${data.image.slice(0, -4)}-400-225.webp` : undefined}
          width={400}
        />
      </PlaceholderSection>

      <Spacer mt={Space * 2} />

      <Section>
        <TabNav>
          <TabNav.Item aria-current to={`/races/${raceId}/race-card`}>
            出走表
          </TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        {data && (
          <>
            <Spacer mt={Space * 2} />
            <PlayerPictureList>
              {data.entries.map((entry) => (
                <PlayerPictureList.Item
                  key={entry.id}
                  image={entry.player.image}
                  name={entry.player.name}
                  number={entry.number}
                />
              ))}
            </PlayerPictureList>

            <Spacer mt={Space * 4} />
            <EntryTable entries={data.entries} />
          </>
        )}
      </Section>
    </Container>
  );
};
