import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 5 * 1000,
});
const api = axios.create({
  adapter: cache.adapter,
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
 * @param {number} maxAge
 */
export const jsonFetcher = async (url, maxAge = 5 * 1000) => {
  const res = await api.get(url, {
    cache: {
      maxAge: maxAge,
    },
    responseType: "json",
  });
  return res.data;
};
