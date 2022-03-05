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

/** @type {React.VFC} */
export const Odds = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);
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
    if (!data) return false;
    return moment(data.closeAt).isBefore(new Date());
  }, [data]);

  return (
    <Container>
      <Spacer mt={Space * 2} />
      {data ? <Heading as="h1">{data.name}</Heading> : <HeadingPlaceholder />}
      {data ? (
        <p>
          開始 {formatTime(data.startAt)} 締切 {formatTime(data.closeAt)}
        </p>
      ) : (
        <PeriodPlaceholder />
      )}

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        {data ? (
          <TrimmedImage
            height={225}
            lazy={false}
            src={data.image}
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

        {data ? (
          <Callout $closed={isRaceClosed}>
            <i className="fas fa-info-circle" />
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
        {data && (
          <OddsTable
            entries={data.entries}
            isRaceClosed={isRaceClosed}
            odds={data.trifectaOdds}
            onClickOdds={handleClickOdds}
          />
        )}

        <Spacer mt={Space * 4} />
        <Heading as="h2">人気順</Heading>

        <Spacer mt={Space * 2} />
        {data && (
          <OddsRankingList
            isRaceClosed={isRaceClosed}
            odds={data.trifectaOdds}
            onClickOdds={handleClickOdds}
          />
        )}
      </Section>

      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </Container>
  );
};
