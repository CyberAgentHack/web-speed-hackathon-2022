import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import { easeOutCubic, useAnimation } from "../../../../hooks/useAnimation";
import { formatCloseAt } from "../../../../utils/DateUtils";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={8 * 2}>
      {children}
    </Stack>
  );
};

const ItemWrapper = styled.li`
  background: #fff;
  border-radius: 12px;
  opacity: ${({ $opacity }) => $opacity};
  padding: ${8 * 3}px;
`;

const RaceButton = styled(LinkButton)`
  background: #44403c;
  border-radius: 12px;
  color: #fff;
  padding: ${8 * 1}px ${8 * 2}px;

  &:hover {
    background: #292524;
  }
`;

const RaceTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ race }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 0);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  const {
    abortAnimation,
    resetAnimation,
    startAnimation,
    value: opacity,
  } = useAnimation({
    duration: 500,
    end: 1,
    start: 0,
    timingFunction: easeOutCubic,
  });

  useEffect(() => {
    resetAnimation();
    startAnimation();

    return () => {
      abortAnimation();
    };
  }, [race.id, startAnimation, abortAnimation, resetAnimation]);

  return (
    <ItemWrapper $opacity={opacity}>
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={8 * 1}>
          <RaceTitle>{race.name}</RaceTitle>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr={8 * 2} />

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={8 * 2}>
            <TrimmedImage height={100} src={race.image} width={100} />
            <RaceButton to={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = Item;
