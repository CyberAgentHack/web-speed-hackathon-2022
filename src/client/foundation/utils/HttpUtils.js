import axios from "axios";
import { setupCache } from "axios-cache-adapter";

export const jsonFetcher = async (/** @type {string} */ url, params) => {
  const res = await axios.get(url, {
    params,
    responseType: "json",
  });
  return res.data;
};
const cache = setupCache({
  maxAge: 5 * 1000,
});

/**
 * @param {string} url
 * @param {string} userId
 * @param {boolean?} useCache
 */
export const authorizedJsonFetcher = async (url, userId, useCache) => {
  const res = await axios.get(url, {
    adapter: useCache ? cache.adapter : null,
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  return res.data;
};

/**
 * @param {string} url
 */
export const raceFetcher = async (url) => {
  const res = await axios.get(url, {
    adapter: cache.adapter,
    responseType: "json",
  });
  return res.data;
};
