import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { BaseButton } from "../../../../../components/buttons/BaseButton";
import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { Stack } from "../../../../../components/layouts/Stack";
import { BreakPoint, Color, Space } from "../../../../../styles/variables";
import { OddsMarker } from "../OddsMarker";

const Wrapper = styled.ol`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${Space * 4}px;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(50, auto);

  li {
    background: ${Color.mono[0]};
    border-top: 1px solid ${Color.mono[400]};

    &:last-child {
      border-bottom: 1px solid ${Color.mono[400]};
    }
  }

  @media (min-width: ${BreakPoint.TABLET}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(25, auto);

    li:nth-child(25) {
      border-bottom: 1px solid ${Color.mono[400]};
    }
  }
`;

const BuyButton = styled(BaseButton)`
  font-weight: bold;
  justify-content: left;
  padding: ${Space * 2}px;
  width: 100%;

  &:hover {
    background: ${Color.mono[200]};
  }
`;

const InactiveBuyButton = styled.div`
  cursor: default;
  font-weight: bold;
  justify-content: left;
  padding: ${Space * 2}px;
  width: 100%;
`;

const RankNo = styled.div`
  width: 32px;
`;

/**
 * @typedef Props
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */

export const OddsRankingList = ({ isRaceClosed, onClickOdds }) => {
  const { raceId } = useParams();
  const [data2, setData2] = useState([]);
  useEffect(() => {
    axios.get(`/api/oddsRank/${raceId}`).then((res) => {
      setData2(res.data.trifectaOdds);
    });
  }, []);
  return (
    <Wrapper>
      {data2.map((item, i) => (
        <li key={item.id}>
          {isRaceClosed ? (
            <InactiveBuyButton>
              <Stack horizontal alignItems="center" gap={Space * 2}>
                <RankNo>{i + 1}.</RankNo>
                <EntryCombination numbers={item.key} />
                <OddsMarker as="div" odds={item.odds} />
              </Stack>
            </InactiveBuyButton>
          ) : (
            <BuyButton onClick={() => onClickOdds(item)}>
              <Stack horizontal alignItems="center" gap={Space * 2}>
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
