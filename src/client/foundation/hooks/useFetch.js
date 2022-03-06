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
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch(apiPath, fetcher) {
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

    const promise = fetcher(apiPath);

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

export function useLaterFetch(apiPath, fetcher) {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });
  const [isCacheLoad, setIsCacheLoad] = useState(0);

  useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      loading: true,
    }));

    const promise = fetcher(apiPath + ".json");

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data,
        loading: false,
      }));
      // pending setIsCacheLoad(1);
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        loading: false,
      }));
    });
  }, [apiPath, fetcher]);

  useEffect(() => {
    if (isCacheLoad !== 1) return;
    setIsCacheLoad(2);

    // 更新データをとりにいく
    const laterPromise = fetcher(apiPath);

    laterPromise.then((laterData) => {
      // TODO: もう少し丁寧にオブジェクトが等価であることを確認する
      // ざっくり確認すれば良いのでとりあえずこれで．
      console.log();
      if (JSON.stringify(result) === JSON.stringify(laterData)) {
        return;
      }
      setResult((cur) => ({
        ...cur,
        data: laterData,
        loading: false,
      }));
    });
    laterPromise.catch(() => {
      /* do nothing */
    });
  }, [apiPath, fetcher, isCacheLoad, result]);

  return result;
}
