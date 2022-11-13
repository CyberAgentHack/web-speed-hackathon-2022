import axios from "axios";

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://web-speed-hackathon-2022-nissy.herokuapp.com";

export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await axios.get(`${BASE_URL}${url}`, { responseType: "json" });
  return res.data;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await axios.get(`${BASE_URL}${url}`, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  return res.data;
};
