import dayjs from "dayjs";
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

import { ChargeDialog } from "./internal/ChargeDialog";
import { HeroImage } from "./internal/HeroImage";
import { RecentRaceList } from "./internal/RecentRaceList";

const ChargeButton = styled.button`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

/** @type {React.VFC} */
export const Top = () => {

  const { date = dayjs().format("YYYY-MM-DD") } = useParams();

  const chargeDialogRef = useRef(null);

  const { data: userData, revalidate } = useAuthorizedFetch("/api/users/me", authorizedJsonFetcher);

  const from = dayjs(`${date} 00:00:00`).unix()
  const to = dayjs(`${date} 23:59:59`).unix()
  const { data: raceData } = useFetch(`/api/races?since=${from}&until=${to}`, jsonFetcher);
  const todayRaces = raceData !== null ? raceData.races : [];

  const handleClickChargeButton = useCallback(() => {
    if (chargeDialogRef.current === null) {
      return;
    }

    chargeDialogRef.current.showModal();
  }, []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  return (
    <Container>
      <HeroImage />

      <Spacer mt={Space * 2} />
      {userData && (
        <Stack horizontal alignItems="center" justifyContent="space-between">
          <div>
            <p>ポイント残高: {userData.balance}pt</p>
            <p>払戻金: {userData.payoff}Yen</p>
          </div>

          <ChargeButton onClick={handleClickChargeButton}>
            チャージ
          </ChargeButton>
        </Stack>
      )}

      <Spacer mt={Space * 2} />
      <section>
        <Heading as="h1">本日のレース</Heading>
        <RecentRaceList races={todayRaces} />
      </section>

      <ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />
    </Container>
  );
};
