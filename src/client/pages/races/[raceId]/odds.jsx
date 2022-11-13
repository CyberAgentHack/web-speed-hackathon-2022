import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React, { Suspense, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

import { Spacer } from "foundation/components/layouts/Spacer";
import { Heading } from "foundation/components/typographies/Heading";
import { Color, Space } from "foundation/styles/variables";
import { jsonFetcher } from "foundation/utils/HttpUtils";
import { TicketVendingModal } from "foundation/pages/races/Odds/TicketVendingModal";
import { useFetch } from "../../../foundation/hooks/useFetch";
import { Container } from "../../../foundation/components/layouts/Container";
import { RaceInfo, RaceTabNavContents } from "../../../foundation/pages/races/RaceLayout";

const OddsRankingList = dynamic(() => import("foundation/pages/races/Odds/OddsRankingList"), {
  suspense: true,
});

const OddsTable = dynamic(() => import("foundation/pages/races/Odds/OddsTable"), {
  suspense: true,
});

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

export const getServerSideProps = async ({ query }) => {
  const { raceId } = query;

  return {
    props: { raceId },
  };
};

export default function Odds({ raceId }) {

  const { data: race } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  const { data: odds } = useFetch(`/api/races/${raceId}/trifectaOdds`, jsonFetcher);

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

  const isRaceClosed = race && dayjs(race.closeAt).isBefore(new Date());

  return (
    <Container>
      <RaceInfo race={race} />
      <RaceTabNavContents race={race}>
        <Spacer mt={Space * 4} />

        <Callout $closed={isRaceClosed}>
          <FontAwesomeIcon icon={["fas", "circle-info"]} />
          {isRaceClosed ? "このレースの投票は締め切られています" : "オッズをクリックすると拳券が購入できます"}
        </Callout>

        <Spacer mt={Space * 4} />
        <Heading as="h2">オッズ表</Heading>

        <Spacer mt={Space * 2} />
        <Suspense fallback={""}>
          <OddsTable
            entries={race?.entries ?? []}
            isRaceClosed={isRaceClosed}
            odds={odds?.items ?? []}
            onClickOdds={handleClickOdds}
          />
        </Suspense>

        <Spacer mt={Space * 4} />
        <Heading as="h2">人気順</Heading>

        <Spacer mt={Space * 2} />
        <Suspense fallback={""}>
          <OddsRankingList
            isRaceClosed={isRaceClosed}
            odds={odds?.items ?? []}
            onClickOdds={handleClickOdds}
          />
        </Suspense>
        <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} race={race} />
      </RaceTabNavContents>
    </Container>
  );
}
