import moment from "moment-timezone";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { HeadingPlaceholder } from "../../../components/placeholders/HeadingPlaceholder";
import { PeriodPlaceholder } from "../../../components/placeholders/PeriodPlaceholder";
import { TrimmedImagePlaceholder } from "../../../components/placeholders/TrimmedImagePlaceholder";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";

import { OddsRankingList } from "./internal/OddsRankingList";
import { OddsTable } from "./internal/OddsTable";
import { TicketVendingModal } from "./internal/TicketVendingModal";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

const Callout = styled.aside`
  align-items: center;
  background: ${({ $closed }) =>
    $closed ? Color.mono[200] : Color.green[100]};
  color: ${({ $closed }) => ($closed ? Color.mono[600] : Color.green[500])};
  display: flex;
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: left;
  padding: ${Space * 1}px ${Space * 2}px;
`;

const CalloutPlaceholder = styled.div`
  background-color: ${Color.mono[200]};
  height: 40px;
  width: 100%;
`;

const SVG = styled.svg`
  overflow: visible;
  display: inline-block;
  font-size: inherit;
  height: 1em;
  vertical-align: -0.125em;
  width: 1em;
`;

/** @type {React.VFC} */
export const Odds = () => {
  const { raceId } = useParams();
  const { data: entriesData } = useFetch(
    `/api/races/${raceId}/entries`,
    jsonFetcher,
  );
  const { data: trifectaOddsData } = useFetch(
    `/api/races/${raceId}/trifectaOdds`,
    jsonFetcher,
  );
  const [oddsKeyToBuy, setOddsKeyToBuy] = useState(null);
  const modalRef = useRef(null);

  const handleClickOdds = useCallback(
    /**
     * @param {Model.OddsItem} odds
     */
    (odds) => {
      setOddsKeyToBuy(odds.key);
      modalRef.current?.showModal();
    },
    [],
  );

  const isRaceClosed = useMemo(() => {
    if (!entriesData) return false;
    return moment(entriesData.closeAt).isBefore(new Date());
  }, [entriesData]);

  return (
    <Container>
      <Spacer mt={Space * 2} />
      {entriesData ? (
        <Heading as="h1">{entriesData.name}</Heading>
      ) : (
        <HeadingPlaceholder />
      )}
      {entriesData ? (
        <p>
          開始 {formatTime(entriesData.startAt)} 締切{" "}
          {formatTime(entriesData.closeAt)}
        </p>
      ) : (
        <PeriodPlaceholder />
      )}

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        {entriesData ? (
          <TrimmedImage
            height={225}
            lazy={false}
            src={entriesData.image}
            width={400}
          />
        ) : (
          <TrimmedImagePlaceholder />
        )}
      </Section>

      <Spacer mt={Space * 2} />

      <Section>
        <TabNav>
          <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item aria-current to={`/races/${raceId}/odds`}>
            オッズ
          </TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 4} />

        {entriesData ? (
          <Callout $closed={isRaceClosed}>
            <SVG viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                fill="currentColor"
              />
            </SVG>
            {isRaceClosed
              ? "このレースの投票は締め切られています"
              : "オッズをクリックすると拳券が購入できます"}
          </Callout>
        ) : (
          <CalloutPlaceholder />
        )}

        <Spacer mt={Space * 4} />
        <Heading as="h2">オッズ表</Heading>

        <Spacer mt={Space * 2} />
        {entriesData && trifectaOddsData && (
          <OddsTable
            entries={entriesData.entries}
            isRaceClosed={isRaceClosed}
            odds={trifectaOddsData}
            onClickOdds={handleClickOdds}
          />
        )}

        <Spacer mt={Space * 4} />
        <Heading as="h2">人気順</Heading>

        <Spacer mt={Space * 2} />
        {trifectaOddsData && (
          <OddsRankingList
            isRaceClosed={isRaceClosed}
            odds={trifectaOddsData}
            onClickOdds={handleClickOdds}
          />
        )}
      </Section>

      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </Container>
  );
};
