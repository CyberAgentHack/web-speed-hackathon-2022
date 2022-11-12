import { jsonFetcher } from "foundation/utils/HttpUtils";
import { useEffect } from "react";
import { atomFamily, selectorFamily, useRecoilValue, useSetRecoilState } from "recoil";
import { OddsItem, Race } from "../../../model";

const raceAtom = atomFamily<Race | null, string>({
  key: "raceAtom",
  default: null,
});

const raceSelector = selectorFamily<Race, string>({
  key: "raceSelector",
  get: (raceId) => async ({ get }) => {
    return get(raceAtom(raceId)) || (await jsonFetcher<Race>(`/api/races/${raceId}`));
  },
});

export const useRace = (raceId: string): Race => {
  const race = useRecoilValue(raceSelector(raceId));

  const set = useSetRecoilState(raceAtom(raceId));
  useEffect(() => {
    if (race) {
      set(race);
    }
  }, [raceId, race]);
  return race;
};

const oddsAtom = atomFamily<OddsItem[] | null, string>({
  key: "oddsAtom",
  default: null,
});

const oddsSelector = selectorFamily<OddsItem[], string>({
  key: "oddsSelector",
  get: (raceId) => async ({ get }) => {
    console.log(raceId);
    return get(oddsAtom(raceId)) ||
      (await jsonFetcher<ArrayResponse<OddsItem>>(`/api/races/${raceId}/trifectaOdds`)).items;
  },
});

export const useOdds = (raceId: string): OddsItem[] => {
  const odds = useRecoilValue(oddsSelector(raceId));
  const set = useSetRecoilState(oddsAtom(raceId));
  useEffect(() => {
    if (odds) {
      set(odds);
    }
  }, [raceId, odds]);
  return odds;
};

type ArrayResponse<T> = {
  items: T[];
};
