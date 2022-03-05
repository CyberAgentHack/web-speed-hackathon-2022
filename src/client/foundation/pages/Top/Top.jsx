import moment from "moment-timezone";
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
import { isSameDay } from "../../utils/DateUtils";
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
  const url = "/api/hero";
  const { data } = useFetch(url, jsonFetcher);

  if (firstRaceId === undefined || data === null) {
    return null;
  }

  // const imageUrl = `${data.url}?${data.hash}`;
  return data.url;
}

/** @type {React.VFC} */
export const Top = () => {
  const { date = moment().format("YYYY-MM-DD") } = useParams();
  const todayUnix = Date.parse(date) / 1000 - 60 * 60 * 9;
  const tomorrowUnix = todayUnix + 24 * 60 * 60;

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

  const { data: raceData } = useFetch(
    `/api/races?since=${todayUnix}&until=${tomorrowUnix}`,
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

  const todayRaces =
    raceData != null
      ? [...raceData.races]
          .sort(
            (/** @type {Model.Race} */ a, /** @type {Model.Race} */ b) =>
              moment(a.startAt) - moment(b.startAt),
          )
          .filter((/** @type {Model.Race} */ race) =>
            isSameDay(race.startAt, date),
          )
      : [];
  const heroImageUrl = useHeroImage(todayRaces);

  return (
    <Container>
      {heroImageUrl !== null && <HeroImage url="/assets/images/hero.webp" />}

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
        {todayRaces.length > 0 && (
          <RecentRaceList>
            {todayRaces.map((race, index) => (
              <RecentRaceList.Item
                key={race.id}
                delay={index * 100}
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
