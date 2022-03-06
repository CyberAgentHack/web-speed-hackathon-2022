import { endOfDay, parse, startOfDay } from "date-fns";
import React, { useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";

import { ChargeDialog } from "./internal/ChargeDialog";
import { HeroImage } from "./internal/HeroImage";
import { RecentRaceList } from "./internal/RecentRaceList";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const date = useParams().date ? parse(useParams().date, "yyyy-MM-dd", new Date()) : new Date();

  const chargeDialogRef = useRef(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );

  const { data: raceData } = useSWR(`/api/races?since=${Math.round(startOfDay(date) / 1000)}&until=${Math.round(endOfDay(date) / 1000)}`, jsonFetcher);

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
      : []), [raceData]);

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
          {todayRaces.map((race, i) => <RecentRaceList.Item key={race.id} delay={i * 100} race={race} />)}
        </RecentRaceList>
      </section>

      {userData && (<ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />)}
    </Container>
  );
};
