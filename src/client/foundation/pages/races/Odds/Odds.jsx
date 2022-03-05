import dayjs from "dayjs";
import React, { useCallback, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { Spacer } from "../../../components/layouts/Spacer";
import { Heading } from "../../../components/typographies/Heading";
import { Color, Space } from "../../../styles/variables";
import { defaultEntries, dummyOdds } from "../../../utils/DummyData";

import { OddsRankingList } from "./internal/OddsRankingList";
import { DummyOddsTable, OddsTable } from "./internal/OddsTable";
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
  const { raceDetail, raceId } = useOutletContext();
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

  const isRaceClosed =
    raceDetail == null ? true : dayjs(raceDetail.closeAt).isBefore(new Date());

  return (
    <>
      <Spacer mt={Space * 4} />

      <Callout $closed={isRaceClosed}>
        <i className="fas fa-info-circle" />
        {isRaceClosed
          ? "このレースの投票は締め切られています"
          : "オッズをクリックすると拳券が購入できます"}
      </Callout>

      <Spacer mt={Space * 4} />
      <Heading as="h2">オッズ表</Heading>

      <Spacer mt={Space * 2} />
      {raceDetail == null ? (
        <DummyOddsTable
          entries={defaultEntries}
          isRaceClosed={false}
          onClickOdds={handleClickOdds}
        />
      ) : (
        <OddsTable
          entries={raceDetail.entries}
          isRaceClosed={isRaceClosed}
          odds={raceDetail.trifectaOdds}
          onClickOdds={handleClickOdds}
        />
      )}

      <Spacer mt={Space * 4} />
      <Heading as="h2">人気順</Heading>

      <Spacer mt={Space * 2} />
      <OddsRankingList
        isRaceClosed={isRaceClosed}
        odds={raceDetail?.trifectaOdds ?? dummyOdds}
        onClickOdds={handleClickOdds}
      />
      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </>
  );
};
