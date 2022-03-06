import axios from "axios";
import { useCallback, useState } from "react";

import { useAuth } from "../contexts/AuthContext";

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
        const res = await axios.request({
          data,
          headers: auth
            ? {
                "x-app-userid": userId,
              }
            : {},
          method,
          url: apiPath,
        });

        // const res = await fetch(apiPath, {
        //   method: method, // *GET, POST, PUT, DELETE, etc.
        //   mode: "cors", // no-cors, *cors, same-origin
        //   headers: auth
        //     ? {
        //         "x-app-userid": userId,
        //       }
        //     : {},
        //   body: JSON.stringify(data), // 本文のデータ型は "Content-Type" ヘッダーと一致させる必要があります
        // });

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
    [apiPath, auth, loggedIn, method, userId],
  );

  return [mutate, result];
}
