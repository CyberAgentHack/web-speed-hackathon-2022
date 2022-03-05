import { useEffect, useState } from "react";
import {useQuery} from 'react-query'

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
export function useFetch(apiPath, fetcher) {
  const {data, error, isLoading} = useQuery(apiPath, fetcher)

  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });

  // useEffect(() => {
  //   setResult(() => ({
  //     data: null,
  //     error: null,
  //     loading: true,
  //   }));

  //   const promise = fetcher(apiPath);

  //   promise.then((data) => {
  //     setResult((cur) => ({
  //       ...cur,
  //       data,
  //       loading: false,
  //     }));
  //   });

  //   promise.catch((error) => {
  //     setResult((cur) => ({
  //       ...cur,
  //       error,
  //       loading: false,
  //     }));
  //   });
  // }, [apiPath, fetcher]);

  useEffect(() => {
    setResult({
      data: data,
      error: error,
      loading: isLoading
    })
  }, [apiPath, fetcher, data, error, isLoading])

  return result;
}
