import { useCallback, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { createFetchError } from "../utils/HttpUtils";

/**
 * @typedef {UseMutationOptions}
 * @property {boolean=} auth
 */

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
 * @param {UseMutationOptions} options
 * @returns {[(body: any) => Promise<void>, ReturnValues<T>]}
 */
export function useMutation(apiPath, { auth }) {
  const [result, setResult] = useState({
    data: null,
    error: null,
    loading: true,
  });
  const { loggedIn, userId } = useAuth();

  const mutate = useCallback(
    async (data) => {
      if (auth && !loggedIn) {
        return;
      }

      setResult(() => ({
        data: null,
        error: null,
        loading: true,
      }));

      try {
        const res = await fetch(apiPath, {
          body: data,
          headers: auth
            ? {
                "x-app-userid": userId,
              }
            : {},
          method: "POST",
        });
        if (!res.ok) throw createFetchError(res);
        const resData = await res.json();

        setResult((cur) => ({
          ...cur,
          data: resData,
          loading: false,
        }));
      } catch (error) {
        setResult((cur) => ({
          ...cur,
          error,
          loading: false,
        }));
      }
    },
    [apiPath, auth, loggedIn, userId],
  );

  return [mutate, result];
}
