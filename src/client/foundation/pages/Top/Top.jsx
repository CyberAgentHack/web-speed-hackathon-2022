import moment from "moment-timezone";
import lazy from "preact-lazy";
import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";

import { HeroImage } from "./internal/HeroImage";
import { RecentRaceList } from "./internal/RecentRaceList";

const ChargeDialog = lazy(() => import("./internal/ChargeDialog"));

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

/** @type {React.VFC} */
export const Top = () => {
  const { date = moment().format("YYYY-MM-DD") } = useParams();

  const ChargeButton = styled.button`
    background: ${Color.mono[700]};
    border-radius: ${Radius.MEDIUM};
    color: ${Color.mono[0]};
    padding: ${Space * 1}px ${Space * 2}px;

    &:hover {
      background: ${Color.mono[800]};
    }
  `;

  const chargeDialogRef = useRef(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );

  const d = new Date(date);
  const params = new URLSearchParams();
  const formatDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  params.append("since", new Date(`${formatDate} 00:00:00`).getTime() / 1000);
  params.append("until", new Date(`${formatDate} 23:59:00`).getTime() / 1000);

  const { data: raceData } = useFetch(
    `/api/races?${params.toString()}`,
    jsonFetcher,
  );

  const handleClickChargeButton = useCallback(() => {
    if (chargeDialogRef.current === null) {
      return;
    }

    chargeDialogRef.current.showModal();
  }, []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  const heroImageUrl = useHeroImage(raceData?.races ?? []);

  return (
    <Container>
      <div style={{ aspectRatio: "auto 1024 / 735", backgroundColor: "#fff" }}>
        {heroImageUrl && <HeroImage url={heroImageUrl} />}
      </div>

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
        {raceData && raceData.races.length > 0 && (
          <RecentRaceList>
            {raceData.races.map((race, i) => (
              <RecentRaceList.Item
                key={race.id}
                num={
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? 0
                    : i
                }
                race={race}
              />
            ))}
          </RecentRaceList>
        )}
      </section>

      <ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />
    </Container>
  );
};
