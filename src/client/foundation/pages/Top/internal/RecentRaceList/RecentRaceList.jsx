import React, { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
import { easeOutCubic, useAnimation } from "../../../../hooks/useAnimation";
import { Color, FontSize, Radius, Space } from "../../../../styles/variables";
import { formatCloseAt } from "../../../../utils/DateUtils";

export const RecentRaceList = ({ children }) => {
  return (
    <Stack as="ul" gap={Space * 2}>
      {children}
    </Stack>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const ItemWrapper = styled.li`
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  
  animation: ${fadeIn} 500ms ${({$delay}) => $delay}ms ease-out both;
  padding: ${Space * 3}px;
`;

const RaceButton = styled(LinkButton)`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

const RaceTitle = styled.h2`
  font-size: ${FontSize.LARGE};
  font-weight: bold;
`;

/**
 * @typedef ItemProps
 * @property {Model.Race} race
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ race, delay }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));

  // TODO
  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  /*
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
  }, [race.id, visible, startAnimation, abortAnimation, resetAnimation]);

  */

  return (
    <ItemWrapper $delay={delay}>
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={Space * 1}>
          <RaceTitle>{race.name}</RaceTitle>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr={Space * 2} />

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={Space * 2}>
            <TrimmedImage height={100} src={`${race.image}_thumb.avif`} width={100} />
            <RaceButton to={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = Item;
