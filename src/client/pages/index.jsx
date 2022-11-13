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
import dynamic from "next/dynamic";

const RecentRaceList = dynamic(() => import("../foundation/pages/top/RecentRaceList"), {
  suspense: true,
});

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
        <Suspense fallback={""}>
          <RecentRaceList />
        </Suspense>
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
