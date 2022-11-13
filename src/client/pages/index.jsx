import dayjs from "dayjs";
import React, { Suspense, useCallback, useRef } from "react";
import styled from "styled-components";

import { Container } from "../foundation/components/layouts/Container";
import { Spacer } from "../foundation/components/layouts/Spacer";
import { Stack } from "../foundation/components/layouts/Stack";
import { Heading } from "../foundation/components/typographies/Heading";
import { useAuthorizedFetch } from "../foundation/hooks/useAuthorizedFetch";
import { Color, Radius, Space } from "../foundation/styles/variables";
import { authorizedJsonFetcher, jsonFetcher } from "../foundation/utils/HttpUtils";

import HeroImage from "../foundation/pages/top/HeroImage";
import RecentRaceList from "../foundation/pages/top/RecentRaceList";
import { useFetch } from "../foundation/hooks/useFetch";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ChargeDialog = dynamic(() => import("../foundation/pages/top/ChargeDialog"), {
  suspense: true,
});

const ChargeButton = styled.button`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

export default function Index() {
  return TopPage();
}

export const TopPage = () => {
  const router = useRouter();
  const { date = dayjs().format("YYYY-MM-DD") } = router.query;

  const sinceUnix = dayjs(`${date} 00:00:00`).unix();
  const untilUnix = dayjs(`${date} 23:59:59`).unix();

  const { data: races } = useFetch(`/api/races?since=${sinceUnix}&until=${untilUnix}`, jsonFetcher);
  const { data: userData, revalidate } = useAuthorizedFetch("/api/users/me", authorizedJsonFetcher);

  const chargeDialogRef = useRef(null);

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
        {
          races && <RecentRaceList races={races} />
        }
      </section>
      {
        userData && (
          <Suspense fallback={""}>
            <ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />
          </Suspense>
        )
      }
    </Container>
  );
};
