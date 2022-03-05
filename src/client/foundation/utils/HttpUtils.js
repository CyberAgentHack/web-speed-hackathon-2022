import axios from "axios";

const origin = process.env.NODE_ENV === "development" ? "" : "https://wsh-2022-cathiecode.herokuapp.com"

export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await axios.get(origin + url, { responseType: "json" });
  return res.data;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await axios.get(origin + url, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  return res.data;
};
