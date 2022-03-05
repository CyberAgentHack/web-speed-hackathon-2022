import { parse } from "date-fns";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { isSameDay } from "../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";

import { ChargeDialog } from "./internal/ChargeDialog";
import { HeroImage } from "./internal/HeroImage";
import { RecentRaceList } from "./internal/RecentRaceList";

/**
 * @param {Model.Race[]} races
 * @returns {Model.Race[]}
 */
function useTodayRacesWithAnimation(races) {
  const [isRacesUpdate, setIsRacesUpdate] = useState(false);
  const [racesToShow, setRacesToShow] = useState([]);
  const numberOfRacesToShow = useRef(0);
  const prevRaces = useRef(races);
  const timer = useRef(null);

  useEffect(() => {
    const tmp = prevRaces.current.map((e) => e.id);
    const isRacesUpdate =
      races.map((e) => e.id).filter(elm => !tmp.includes(elm)).length !== 0;

    prevRaces.current = races;
    setIsRacesUpdate(isRacesUpdate);
  }, [races]);

  useEffect(() => {
    if (!isRacesUpdate) {
      return;
    }
    // 視覚効果 off のときはアニメーションしない
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRacesToShow(races.map(race => ({race, visible: true})));
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
      setRacesToShow(races.map((race, index) => ({race, visible: index <= numberOfRacesToShow.current})));
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

/**
 * @param {Model.Race[]} todayRaces
 * @returns {string | null}
 */
function useHeroImage(todayRaces) {
  const firstRaceId = todayRaces[0]?.id;
  const url =
    firstRaceId !== undefined
      ? `/api/hero?firstRaceId=${firstRaceId}`
      : "/api/hero";
  const { data } = useFetch(url, jsonFetcher);

  if (firstRaceId === undefined || data === null) {
    return null;
  }

  const imageUrl = `${data.url}?${data.hash}`;
  return imageUrl;
}

const ChargeButton = styled.button`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

/** @type {React.VFC} */
export const Top = () => {
  const date = useParams().date ? parse(useParams().date, "yyyy-MM-dd", new Date()) : new Date();

  const chargeDialogRef = useRef(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );

  const { data: raceData } = useFetch("/api/races", jsonFetcher);

  const handleClickChargeButton = useCallback(() => {
    if (chargeDialogRef.current === null) {
      return;
    }

    chargeDialogRef.current.showModal();
  }, []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  const todayRaces = useMemo(
    () => (raceData != null
      ? [...raceData.races]
          .sort(
            (/** @type {Model.Race} */ a, /** @type {Model.Race} */ b) =>
              new Date(a.startAt) - new Date(b.startAt),
          )
          .filter((/** @type {Model.Race} */ race) =>
            isSameDay(new Date(race.startAt), date),
          )
      : []), [raceData, date]);

  const heroImageUrl = useHeroImage(todayRaces);

  return (
    <Container>
      <HeroImage url={heroImageUrl ?? ""} />

      <Spacer mt={Space * 2} />
      {userData && (
        <Stack horizontal alignItems="center" justifyContent="space-between">
          <div>
            <p>ポイント残高: {userData.balance}pt</p>
            <p>払戻金: {userData.payoff}円</p>
          </div>

          <ChargeButton onClick={handleClickChargeButton}>
            チャージ
          </ChargeButton>
        </Stack>
      )}

      <Spacer mt={Space * 2} />
      <section>
        <Heading as="h1">本日のレース</Heading>
        <RecentRaceList>
          {todayRaces.map((race, i) => <RecentRaceList.Item key={race.id} race={race} delay={i * 100} />)}
        </RecentRaceList>
      </section>

      {userData && (<ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />)}
    </Container>
  );
};
