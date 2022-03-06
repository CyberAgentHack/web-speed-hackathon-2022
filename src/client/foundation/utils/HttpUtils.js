import axios from "axios";
export const jsonFetcher = async (/** @type {string} */ url) => {
  // const res = await axios.get(url, { responseType: "json" });
  const res = await fetch(url, { responseType: "json" })
  // console.log(res)
  if (res.ok) {
    const text = await res.text();
    return JSON.parse(text || "null")
  }
  return null
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await axios.get(url, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  return res.data;
};
