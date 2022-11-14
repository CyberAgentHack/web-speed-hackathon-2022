import { useEffect, useState } from "react";

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
 * @param {(apiPath: string,params:any) => Promise<T>} fetcher
 * @param {number?} maxAge
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher, maxAge) {
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

    const promise = fetcher(apiPath, maxAge);

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
  }, [apiPath, fetcher, maxAge]);

  return result;
}
