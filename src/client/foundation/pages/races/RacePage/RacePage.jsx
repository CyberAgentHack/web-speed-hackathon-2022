import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { BreakPoint, Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";
import { Odds } from "../Odds";
import { RaceCard } from "../RaceCard";
import { RaceResult } from "../RaceResult";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space}px;
  text-transform: uppercase;
`;
const LoadingWrapper = styled.div`
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${Space * 2}px;
  padding-right: ${Space * 2}px;
  width: 100%;

  @media (min-width: ${BreakPoint.TABLET}px) {
    max-width: calc(1024px + ${Space * 5}px * 2);
    padding-left: ${Space * 5}px;
    padding-right: ${Space * 5}px;
  }
`;

const PageType = {
  ODDS: "odds",
  RACE_CARD: "race-card",
  RACE_RESULT: "result",
};
/** @type {React.VFC} */
export const RacePage = () => {
  const currentPath = useLocation().pathname;
  const { raceId } = useParams();
  const { data, loading } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  const isCurrentPath = (current, path) => current.indexOf(path) !== -1;
  const render = useMemo(() => {
    if (isCurrentPath(currentPath, PageType.ODDS)) {
      return <Odds data={data} raceId={raceId}></Odds>;
    }
    if (isCurrentPath(currentPath, PageType.RACE_CARD)) {
      return <RaceCard data={data}></RaceCard>;
    }
    if (isCurrentPath(currentPath, PageType.RACE_RESULT)) {
      return <RaceResult raceId={raceId}></RaceResult>;
    }
  }, [currentPath, data, raceId]);
  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data.name}</Heading>
      <p>
        開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
      </p>
      <Spacer mt={Space * 2} />
      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage widthAuto height={225} src={data.image} width={400} />
      </Section>
      <Spacer mt={Space * 2} />
      <Section>
        <>
          <TabNav>
            <TabNav.Item
              aria-current={isCurrentPath(currentPath, "race-card")}
              to={`/races/${raceId}/race-card`}
            >
              出走表
            </TabNav.Item>
            <TabNav.Item
              aria-current={isCurrentPath(currentPath, "odds")}
              to={`/races/${raceId}/odds`}
            >
              オッズ
            </TabNav.Item>
            <TabNav.Item
              aria-current={isCurrentPath(currentPath, "result")}
              to={`/races/${raceId}/result`}
            >
              結果
            </TabNav.Item>
          </TabNav>
          <Spacer
            mt={Space * (isCurrentPath(currentPath, "race-card") ? 2 : 4)}
          />
        </>
        {render}
      </Section>
    </Container>
  );
};
