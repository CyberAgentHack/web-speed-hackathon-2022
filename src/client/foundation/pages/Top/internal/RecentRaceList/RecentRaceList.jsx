import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { LinkButton } from "../../../../components/buttons/LinkButton";
import { Spacer } from "../../../../components/layouts/Spacer";
import { Stack } from "../../../../components/layouts/Stack";
import { TrimmedImage } from "../../../../components/media/TrimmedImage";
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
`;

const ItemWrapper = styled.li`
  opacity: 0;
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  animation: ${fadeIn} 0.5s ease-out ${({ $delay }) => $delay}ms 1 normal
    forwards;
  padding: ${Space * 3}px;
`;

const RaceButton = styled(LinkButton)`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

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
 * * @property number delay
 */

/** @type {React.VFC<ItemProps>} */
const Item = ({ lazy, race }) => {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(race.closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(race.closeAt));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [race.closeAt]);

  return (
    <ItemWrapper>
      <Stack horizontal alignItems="center" justifyContent="space-between">
        <Stack gap={Space * 1}>
          <RaceTitle>{race.name}</RaceTitle>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr={Space * 2} />

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={Space * 2}>
            <TrimmedImage height={100} lazy={lazy} src={race.image} width={100} />
            <RaceButton
              disabled={race.id === "1"}
              to={`/races/${race.id}/race-card`}
            >
              投票
            </RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = Item;
