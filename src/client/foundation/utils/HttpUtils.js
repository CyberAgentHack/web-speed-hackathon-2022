import axios from "axios";

export const API_HOST = process.env.NODE_ENV === "production"
  ? "https://wsh-tsuyoshi-nishikawa.herokuapp.com"
  : "http://0.0.0.0:8888";

/**
 * @param {string} url
 */
export const jsonFetcher = async (url) => {
  const res = await axios.get(API_HOST + url, { responseType: "json" });
  return res.data;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await axios.get(API_HOST + url, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  return res.data;
};
