import { useEffect, useState } from "react";

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} loading
 */

const caches = {};

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @param {boolean?} enableCache
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher, enableCache = false) {
  const [result, setResult] = useState({
    data: enableCache && caches[apiPath] != null ? caches[apiPath] : null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      loading: true,
    }));

    if (enableCache && caches[apiPath] != null) {
      setResult(() => ({
        data: caches[apiPath],
        error: null,
        loading: false,
      }));
      return;
    }

    const promise = fetcher(apiPath);

    promise.then((data) => {
      caches[apiPath] = data;
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
