import { useEffect, useState } from "react";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://speedhack-back-ufwuu4dz4q-an.a.run.app"
    : "http://localhost:8081";

const todayUnixTime = () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return Math.floor(date.getTime() / 1000);
};

const UNIXTIME_PER_DAY = 86400;
const since = todayUnixTime();
const until = since + UNIXTIME_PER_DAY;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} loading
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch2(apiPath, fetcher) {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      loading: true,
    }));

    console.log({ since, until });

    const promise = fetcher(
      baseUrl + apiPath + `?since=${since}&until=${until}`,
    );

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data,
        loading: false,
      }));
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        loading: false,
      }));
    });
  }, [apiPath, fetcher]);

  return result;
}
