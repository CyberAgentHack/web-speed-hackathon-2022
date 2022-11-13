import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { BaseButton } from "../../../../../components/buttons/BaseButton";
import { EntryCombination } from "../../../../../components/displays/EntryCombination";
import { Stack } from "../../../../../components/layouts/Stack";
import { BreakPoint, Color, Space } from "../../../../../styles/variables";
import { raceFetcher } from "../../../../../utils/HttpUtils";
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
 * @property {Model.OddsItem[]} odds
 * @property {boolean} isRaceClosed
 * @property {(odds: Model.OddsItem) => void} onClickOdds
 */

/** @type {React.VFC<Props>} */
export const OddsRankingList = ({
  isRaceClosed,
  odds,
  onClickOdds,
  raceId,
}) => {
  // FIXME: 本来ならばここにfetch書きたくない、、、API依存になるので
  const fetch = async () => {
    try {
      const res = await raceFetcher(`/api/races/${raceId}/lank-list`);
      set0ddsItems(res);
    } catch (e) {
      console.error(e);
    }
  };
  const [oddsItems, set0ddsItems] = useState(odds);

  const el = useRef(null);
  useEffect(() => {
    if (el.current == null) {
      return;
    }
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        await fetch();
        observer.disconnect();
      },
      {
        rootMargin: "200px",
      },
    );
    observer.observe(el.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <Wrapper ref={el}>
      {oddsItems.map((item, i) => (
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
