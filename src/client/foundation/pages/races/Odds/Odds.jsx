import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React, { useCallback, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { Spacer } from "../../../components/layouts/Spacer";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Space } from "../../../styles/variables";
import { jsonFetcher } from "../../../utils/HttpUtils";

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
  const { race, raceId } = useOutletContext();
  const { data: trifectaOdds } = useFetch(`/api/races/${raceId}/trifectaOdds`, jsonFetcher);

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
    []
  );

  const isRaceClosed = race === null || dayjs(race.closeAt).isBefore(new Date());

  return (
    <>
      <Spacer mt={Space * 4} />

      <Callout $closed={isRaceClosed}>
        <FontAwesomeIcon icon={["fas", "circle-info"]} />
        {isRaceClosed
          ? "このレースの投票は締め切られています"
          : "オッズをクリックすると拳券が購入できます"}
      </Callout>

      <Spacer mt={Space * 4} />
      <Heading as="h2">オッズ表</Heading>

      <Spacer mt={Space * 2} />
      <OddsTable
        entries={race?.entries ?? []}
        isRaceClosed={isRaceClosed}
        odds={trifectaOdds ?? []}
        onClickOdds={handleClickOdds}
      />

      <Spacer mt={Space * 4} />
      <Heading as="h2">人気順</Heading>

      <Spacer mt={Space * 2} />
      <OddsRankingList
        isRaceClosed={isRaceClosed}
        odds={trifectaOdds ?? []}
        onClickOdds={handleClickOdds}
      />
      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </>
  );
};
