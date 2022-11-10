import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { LinkButton } from "@/foundation/components/buttons/LinkButton";
import { Spacer } from "@/foundation/components/layouts/Spacer";
import { Stack } from "@/foundation/components/layouts/Stack";
import { TrimmedImage } from "@/foundation/components/media/TrimmedImage";
import { easeOutCubic, useAnimation } from "@/foundation/hooks/useAnimation";
import { Color, FontSize, Radius, Space } from "@/foundation/styles/variables";
import { formatCloseAt } from "@/foundation/utils/DateUtils";
import { useRouter } from "next/router";

export default function RecentRaceList({ races }) {
  return (
    <Stack as="ul" gap={Space * 2}>
      {races.map((race) => <RecentRaceList.Item key={race.id} race={race} />)}
    </Stack>
  );
}

const ItemWrapper = styled.li`
  background: ${Color.mono[0]};
  border-radius: ${Radius.MEDIUM};
  opacity: ${({ $opacity }) => $opacity};
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
const Item = ({ race }) => {
  const router = useRouter();
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
        <Stack gap={Space * 1}>
          <RaceTitle>{race.name}</RaceTitle>
          <p>{closeAtText}</p>
        </Stack>

        <Spacer mr={Space * 2} />

        <Stack.Item grow={0} shrink={0}>
          <Stack horizontal alignItems="center" gap={Space * 2}>
            <ItemImg height={100} race={race} width={100} />
            <RaceButton href={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = Item;

/**
 * @param {Model.Race} race
 * @returns {Model.Race}
 */
function useTodayRaceWithAnimation(race) {
  const [racesToShow, setRacesToShow] = useState(null);

  useEffect(() => {
    // 視覚効果 off のときはアニメーションしない
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRacesToShow(race);
      return;
    }

    setTimeout(() => {
      setRacesToShow(race);
    }, 100);
  }, [race]);

  return racesToShow;
}

/**
 * @typedef ItemProps
 * @property {number} height
 * @property {Model.Race} race
 * @property {number} width
 */

/** @type {React.VFC<ItemProps>} */
const ItemImg = ({ height, race: todayRace, width }) => {
  const race = useTodayRaceWithAnimation(todayRace);

  return <TrimmedImage height={height} loading={"lazy"} src={race ? race.image : ""} width={width} />;
};
