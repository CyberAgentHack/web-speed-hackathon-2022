import moment from "moment-timezone";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { CircleInfoSolid } from "../../../components/icons";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { OutletContext } from "../../../contexts/OutletContext";
import { Color, Space } from "../../../styles/variables";

import { OddsRankingList } from "./internal/OddsRankingList";
import { OddsTable } from "./internal/OddsTable";
import { TicketVendingModal } from "./internal/TicketVendingModal";

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
export const Odds = () => {
  const { closeAt, entries, trifectaOdds } = useContext(OutletContext);
  const { raceId } = useParams();
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

  const isRaceClosed = moment(closeAt).isBefore(new Date());

  return (
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
        <CircleInfoSolid class="fa" />
        {isRaceClosed
          ? "このレースの投票は締め切られています"
          : "オッズをクリックすると拳券が購入できます"}
      </Callout>

      <Spacer mt={Space * 4} />
      <Heading as="h2">オッズ表</Heading>

      <Spacer mt={Space * 2} />
      <OddsTable
        entries={entries}
        isRaceClosed={isRaceClosed}
        odds={trifectaOdds}
        onClickOdds={handleClickOdds}
      />

      <Spacer mt={Space * 4} />
      <Heading as="h2">人気順</Heading>

      <Spacer mt={Space * 2} />
      <OddsRankingList
        isRaceClosed={isRaceClosed}
        odds={trifectaOdds}
        onClickOdds={handleClickOdds}
      />
      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </Section>
  );
};
