import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

function useCountUp(max) {
  const [num, setNum] = useState(0);
  const numRef = useRef(num);
  const interval = useRef(0)
  const count = useRef(0)
  const countup = useCallback(() =>
    {
      if(numRef.current>=max){
        clearInterval(interval.current);
        return;
      }
      count.current += 1;
      setNum(count.current)
  },[max])
  useEffect(()=>{
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNum(max);
      return;
    }
    interval.current = setInterval(countup,100)
    return () => clearInterval(interval.current)
  },[countup, max])
  return num;
}

const ChargeButton = styled.button`
  background: ${Color.mono[700]};
  border-radius: ${Radius.MEDIUM};
  color: ${Color.mono[0]};
  padding: ${Space * 1}px ${Space * 2}px;
  border-width: 0;

  &:hover {
    background: ${Color.mono[800]};
  }
`;
/** @type {React.VFC} */
export default function Top() {
  const since = moment(moment().format("YYYY-MM-DD") + " 00:00:00").unix()
  const until = moment(moment().format("YYYY-MM-DD") + " 23:59:59").unix()
  const { date = moment().format("YYYY-MM-DD") } = useParams();

  const chargeDialogRef = useRef(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher
  );

  let { data: raceData } = useFetch(`/api/races?since=${since}&until=${until}`, jsonFetcher);
  raceData = raceData.filter((race)=>isSameDay(race.startAt,date))
  const handleClickChargeButton = useCallback(() => {
    if (chargeDialogRef.current === null) {
      return;
    }

    chargeDialogRef.current.showModal();
  }, []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);
  useEffect(()=>console.log(since,until, raceData),[raceData])
   const cursor = useCountUp(raceData?raceData.races.length:0)
  return (
    <Container>
      <HeroImage />

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
        {raceData && (
          <RecentRaceList>
            {raceData.races.slice(0,cursor).map((race) => (
              <RecentRaceList.Item key={race.id} race={race} />
            ))}
          </RecentRaceList>
        )}
      </section>

      <ChargeDialog ref={chargeDialogRef} onComplete={handleCompleteCharge} />
    </Container>
  );
}
