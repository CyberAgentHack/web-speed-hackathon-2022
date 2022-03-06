import moment from "moment";
import React, { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Fa } from "../../../components/icons/Fa";
import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TabNav } from "../../../components/navs/TabNav";
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

/** @type {React.VFC} */
export default function Odds()  {
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

  const isRaceClosed = data?moment(data.closeAt).isBefore(new Date()):true;

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data?data.name:'title'}</Heading>
      <p>
        開始 {formatTime(data?data.startAt:'0:00')} 締切 {data?formatTime(data.closeAt):'0:00'}
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
          <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item aria-current to={`/races/${raceId}/odds`}>
            オッズ
          </TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 4} />

        <Callout $closed={isRaceClosed}>
          <Fa icon="solid-circle-info" />
          {isRaceClosed
            ? "このレースの投票は締め切られています"
            : "オッズをクリックすると拳券が購入できます"}
        </Callout>

        <Spacer mt={Space * 4} />
        <Heading as="h2">オッズ表</Heading>

        <Spacer mt={Space * 2} />
        {<OddsTable
          entries={data?data.entries:[]}
          isRaceClosed={isRaceClosed}
          onClickOdds={handleClickOdds}
          raceId={raceId}
        />}

        <Spacer mt={Space * 4} />
        <Heading as="h2">人気順</Heading>

        <Spacer mt={Space * 2} />
        {data?<OddsRankingList
          isRaceClosed={isRaceClosed}
          odds={data.trifectaOdds}
          onClickOdds={handleClickOdds}
        />:<></>}
      </Section>

      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </Container>
  );
};
