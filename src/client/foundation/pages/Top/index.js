import React, { useMemo } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { endOfDay, parse, startOfDay } from "date-fns";
import { jsonFetcher, authorizedJsonFetcher } from "../../utils/HttpUtils";

const TopPage = React.lazy(() => import("./Top"));

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

export default function Top() {
  const params = useParams();
  const date = params.date ? parse(params.date, "yyyy-MM-dd", new Date()) : new Date();

  const { data: userData, userRevalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );

  const { data: raceData } = useFetch(`/api/races?since=${Math.round(startOfDay(date) / 1000)}&until=${Math.round(endOfDay(date) / 1000)}`, jsonFetcher);

  const todayRaces = useMemo(
    () => (raceData != null
      ? [...raceData.races]
          .sort(
            (/** @type {Model.Race} */ a, /** @type {Model.Race} */ b) =>
              new Date(a.startAt) - new Date(b.startAt),
          )
      : []), [raceData]);

    const heroImageUrl = useHeroImage(todayRaces);

  return <TopPage date={date} userData={userData} todayRaces={todayRaces} userRevalidate={userRevalidate} heroImageUrl={heroImageUrl} />
}