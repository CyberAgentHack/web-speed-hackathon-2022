import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { LinkButton } from "foundation/components/buttons/LinkButton";
import { Spacer } from "foundation/components/layouts/Spacer";
import { Stack } from "foundation/components/layouts/Stack";
import { TrimmedImage } from "foundation/components/media/TrimmedImage";
import { easeOutCubic, useAnimation } from "foundation/hooks/useAnimation";
import { Color, FontSize, Radius, Space } from "foundation/styles/variables";
import { formatCloseAt } from "foundation/utils/DateUtils";
import { difference, map, slice } from "lodash-es";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useFetch } from "../../hooks/useFetch";
import { jsonFetcher } from "../../utils/HttpUtils";

export default function RecentRaceList() {

  const router = useRouter();
  const { date = dayjs().format("YYYY-MM-DD") } = router.query;

  const sinceUnix = dayjs(`${date} 00:00:00`).unix();
  const untilUnix = dayjs(`${date} 23:59:59`).unix();
  const { data: races } = useFetch(`/api/races?since=${sinceUnix}&until=${untilUnix}`, jsonFetcher);

  function useTodayRacesWithAnimation(races) {
    const [isRacesUpdate, setIsRacesUpdate] = useState(false);
    const [racesToShow, setRacesToShow] = useState([]);
    const numberOfRacesToShow = useRef(0);
    const timer = useRef(null);

    useEffect(() => {
      const isRacesUpdate = difference(races.map((e) => e.id), racesToShow.map((e) => e.id)).length !== 0;
      setIsRacesUpdate(isRacesUpdate);
    }, [races]);

    useEffect(() => {
      if (!isRacesUpdate) {
        return;
      }
      // 視覚効果 off のときはアニメーションしない
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRacesToShow(races);
        return;
      }

      numberOfRacesToShow.current = 0;
      if (timer.current !== null) {
        clearInterval(timer.current);
      }

      timer.current = setInterval(() => {
        if (numberOfRacesToShow.current >= races.length) {
          clearInterval(timer.current);
          return;
        }

        numberOfRacesToShow.current++;
        setRacesToShow(slice(races, 0, numberOfRacesToShow.current));
      }, 100);
    }, [isRacesUpdate, races]);

    useEffect(() => {
      return () => {
        if (timer.current !== null) {
          clearInterval(timer.current);
        }
      };
    }, []);

    return racesToShow;
  }

  const racesToShow = useTodayRacesWithAnimation(races?.items ?? []);

  return (
    <Stack as="ul" gap={Space * 2}>
      {racesToShow.map((race) => <RecentRaceList.Item race={race} />)}
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
            <TrimmedImage height={100} loading={"lazy"} src={race ? race.image : ""} width={100} />
            <RaceButton href={`/races/${race.id}/race-card`}>投票</RaceButton>
          </Stack>
        </Stack.Item>
      </Stack>
    </ItemWrapper>
  );
};
RecentRaceList.Item = Item;
