import React, { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useLaterFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { isSameDay } from "../../utils/DateUtils";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";

import { ChargeDialog } from "./internal/ChargeDialog";
import { HeroImage } from "./internal/HeroImage";
import { RecentRaceList } from "./internal/RecentRaceList";

const formatDate = (date) => {
  return `
    ${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}
  `.replace(/\n|\r| /g, "");
};

const mockRace = {
  closeAt: new Date(),
  id: "1",
  image: "",
  name: "Loading...",
};

/** @type {React.VFC} */
export const Top = () => {
  const { date = formatDate(new Date()) } = useParams();
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

  const { data: raceData } = useLaterFetch(
    `/api/races/${todayUnix}/${tomorrowUnix}/data`,
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
              Date.parse(a.startAt) - Date.parse(b.startAt),
          )
          .filter((/** @type {Model.Race} */ race) =>
            isSameDay(race.startAt, date),
          )
      : [];

  return (
    <Container>
      <HeroImage url="/assets/images/hero.webp" />

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
          {(raceData != null ? todayRaces : [...Array(24).keys()]).map(
            (race, index) => (
              <RecentRaceList.Item
                key={race.id ?? index}
                lazy={index > 3}
                race={todayRaces.length > 0 ? race : mockRace}
              />
            ),
          )}
        </RecentRaceList>
      </section>
      {userData && (
        <ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />
      )}
    </Container>
  );
};
