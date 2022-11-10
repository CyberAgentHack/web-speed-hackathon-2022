import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { Spacer } from "@/foundation/components/layouts/Spacer";
import { Heading } from "@/foundation/components/typographies/Heading";
import { useFetch } from "@/foundation/hooks/useFetch";
import { Color, Space } from "@/foundation/styles/variables";
import { jsonFetcher } from "@/foundation/utils/HttpUtils";

import OddsRankingList from "@/foundation/pages/races/Odds/OddsRankingList";
import OddsTable from "@/foundation/pages/races/Odds/OddsTable";
import { TicketVendingModal } from "@/foundation/pages/races/Odds/TicketVendingModal";
import { useRouter } from "next/router";
import RaceLayout from "@/foundation/pages/races/RaceLayout";

const Callout = styled.aside`
  align-items: center;
  background: ${({ $closed }) => $closed ? Color.mono[200] : Color.green[100]};
  color: ${({ $closed }) => ($closed ? Color.mono[600] : Color.green[500])};
  display: flex;
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: left;
  padding: ${Space * 1}px ${Space * 2}px;
`;

/** @type {React.VFC} */
export default function Odds() {
  const router = useRouter();
  const { raceId } = router.query;
  // TODO
  // const { race } = useOutletContext();
  const race = null;

  const { data } = useFetch(`/api/races/${raceId}/trifectaOdds`, jsonFetcher);

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

  const isRaceClosed = race === null || dayjs(race.closeAt).isBefore(new Date());

  return (
    <>
      <Spacer mt={Space * 4} />

      <Callout $closed={isRaceClosed}>
        <FontAwesomeIcon icon={["fas", "circle-info"]} />
        {isRaceClosed ? "このレースの投票は締め切られています" : "オッズをクリックすると拳券が購入できます"}
      </Callout>

      <Spacer mt={Space * 4} />
      <Heading as="h2">オッズ表</Heading>

      <Spacer mt={Space * 2} />
      <OddsTable
        entries={race?.entries ?? []}
        isRaceClosed={isRaceClosed}
        odds={data?.odds ?? []}
        onClickOdds={handleClickOdds}
      />

      <Spacer mt={Space * 4} />
      <Heading as="h2">人気順</Heading>

      <Spacer mt={Space * 2} />
      <OddsRankingList
        isRaceClosed={isRaceClosed}
        odds={data?.odds ?? []}
        onClickOdds={handleClickOdds}
      />
      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </>
  );
}

Odds.getLayout = function getLayout(page) {
  return (
    <RaceLayout>
      {page}
    </RaceLayout>
  );
};
