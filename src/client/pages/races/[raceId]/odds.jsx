import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { Spacer } from "foundation/components/layouts/Spacer";
import { Heading } from "foundation/components/typographies/Heading";
import { Color, Space } from "foundation/styles/variables";
import { jsonFetcher } from "foundation/utils/HttpUtils";

import OddsRankingList from "foundation/pages/races/Odds/OddsRankingList";
import OddsTable from "foundation/pages/races/Odds/OddsTable";
import { TicketVendingModal } from "foundation/pages/races/Odds/TicketVendingModal";
import { useFetch } from "../../../foundation/hooks/useFetch";
import { Container } from "../../../foundation/components/layouts/Container";
import { RaceInfo, RaceTabNavContents } from "../../../foundation/pages/races/RaceLayout";

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

  const race = await jsonFetcher(`/api/races/${raceId}`);

  return {
    props: { race },
  };
};

export default function Odds({ race }) {
  const { data: odds } = useFetch(`/api/races/${race.id}/trifectaOdds`, jsonFetcher);

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

  const isRaceClosed = dayjs(race.closeAt).isBefore(new Date());

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
        <OddsTable
          entries={race?.entries ?? []}
          isRaceClosed={isRaceClosed}
          odds={odds?.items ?? []}
          onClickOdds={handleClickOdds}
        />

        <Spacer mt={Space * 4} />
        <Heading as="h2">人気順</Heading>

        <Spacer mt={Space * 2} />
        <OddsRankingList
          isRaceClosed={isRaceClosed}
          odds={odds?.items ?? []}
          onClickOdds={handleClickOdds}
        />
        <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={race.id} />
      </RaceTabNavContents>
    </Container>
  );
}
