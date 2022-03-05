import sortBy from "lodash.sortby";
import React from "react";
import styled from "styled-components";

import { BaseButton } from "../../../../../components/buttons/BaseButton";
import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { Stack } from "../../../../../components/layouts/Stack";
import { OddsMarker } from "../OddsMarker";

const Wrapper = styled.ol`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${32}px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(50, auto);
  li {
    background: #fff;
    border-top: 1px solid #a8a29e;
    &:last-child {
      border-bottom: 1px solid #a8a29e;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(25, auto);
    li:nth-child(25) {
      border-bottom: 1px solid #a8a29e;
    }
  }
`;

const BuyButton = styled(BaseButton)`
  font-weight: bold;
  justify-content: left;
  padding: ${16}px;
  width: 100%;
  &:hover {
    background: #e7e5e4;
  }
`;

const InactiveBuyButton = styled.div`
  cursor: default;
  font-weight: bold;
  justify-content: left;
  padding: ${16}px;
  width: 100%;
`;

const RankNo = styled.div`
  width: 32px;
`;

/**
 * @typedef Props
 * @property {Model.OddsItem[]} odds
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsRankingList = ({ isRaceClosed, odds, onClickOdds }) => {
  const take = (arr, qty = 1) => [...arr].splice(0, qty);
  const sortedOdds = take(
    sortBy(odds, (item) => item.odds),
    50,
  );

  return (
    <Wrapper>
      {sortedOdds.map((item, i) => (
        <li key={item.id}>
          {isRaceClosed ? (
            <InactiveBuyButton>
              <Stack horizontal alignItems="center" gap={16}>
                <RankNo>{i + 1}.</RankNo>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </InactiveBuyButton>
          ) : (
            <BuyButton onClick={() => onClickOdds(item)}>
              <Stack horizontal alignItems="center" gap={16}>
                <RankNo>{i + 1}.</RankNo>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </BuyButton>
          )}
        </li>
      ))}
    </Wrapper>
  );
};
