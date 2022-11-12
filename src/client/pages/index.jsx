import dayjs from "dayjs";
import React, {Suspense, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {Container} from "../foundation/components/layouts/Container";
import {Spacer} from "../foundation/components/layouts/Spacer";
import {Stack} from "../foundation/components/layouts/Stack";
import {Heading} from "../foundation/components/typographies/Heading";
import {useAuthorizedFetch} from "../foundation/hooks/useAuthorizedFetch";
import {Color, Radius, Space} from "../foundation/styles/variables";
import {authorizedJsonFetcher, jsonFetcher} from "../foundation/utils/HttpUtils";

import HeroImage from "../foundation/pages/top/HeroImage";
import RecentRaceList from "../foundation/pages/top/RecentRaceList";
import {difference, slice} from "lodash-es";
import {ChargeDialog} from "../foundation/pages/top/ChargeDialog";
import { useFetch } from "../foundation/hooks/useFetch";

const ChargeButton = styled.button`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space}px ${Space * 2}px;

  &:hover {
    background: ${Color.mono[800]};
  }
`;

export async function getServerSideProps({ query }) {
  return fetchRaces({ query });
}

export const fetchRaces = async ({ query }) => {
  const { date = dayjs().format("YYYY-MM-DD") } = query;

  const sinceUnix = dayjs(`${date} 00:00:00`).unix();
  const untilUnix = dayjs(`${date} 23:59:59`).unix();

  return {
    props: { sinceUnix, untilUnix },
  };
};

export default function Index({ sinceUnix, untilUnix }) {
  return TopPage({ sinceUnix, untilUnix });
}

export const TopPage = ({ sinceUnix, untilUnix }) => {
  const { data: races } = useFetch(`/api/races?since=${sinceUnix}&until=${untilUnix}`, jsonFetcher)

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
        {racesToShow.length > 0 && (
          <RecentRaceList>
            {racesToShow.map((race) => (
              <Suspense fallback={<div>Loading...</div>}>
                <RecentRaceList.Item key={race.id} race={race} />
              </Suspense>
            ))}
          </RecentRaceList>
        )}
      </section>

      <Suspense fallback={<div />}>
        <ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />
      </Suspense>
    </Container>
  );
};
