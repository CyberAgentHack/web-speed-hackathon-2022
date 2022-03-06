import { useCallback, useState } from "react";

import { useAuth } from "../contexts/AuthContext";

import { baseUrl } from "./useFetch";

/**
 * @typedef {UseMutationOptions}
 * @property {string} method
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
export function useMutation(apiPath, { auth, method }) {
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
        const res = await fetch(baseUrl + apiPath, {
          body: JSON.stringify(data),
          headers: auth
            ? {
                "x-app-userid": userId,
                "Content-Type": "application/json",
              }
            : {
                "Content-Type": "application/json",
              },
          method: method,
        });
        console.log(res);

        setResult((cur) => ({
          ...cur,
          data: res.data,
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
