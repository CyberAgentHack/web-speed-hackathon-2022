import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { jsonFetcher } from "../../../utils/HttpUtils";

const OddsPage = React.lazy(() => import("./Odds"))

export default function Odds() {
  const [firstKey, setFirstKey] = useState(1);

  const { raceId } = useParams();
  const { data: metadata } = useFetch(`/api/races/${raceId}/subset`, jsonFetcher);
  const { data: oddsMap } = useFetch(`/api/races/${raceId}/odds_map/${firstKey}`, jsonFetcher);
  const { data: sortedOdds } = useFetch(`/api/races/${raceId}/odds_popular`, jsonFetcher);

  return <OddsPage raceId={raceId} metadata={metadata} oddsMap={oddsMap} firstKey={firstKey} setFirstKey={setFirstKey} sortedOdds={sortedOdds} />
}
