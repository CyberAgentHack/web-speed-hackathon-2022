const BASE_PATH = "https://web-speed-hackathon.nissy-dev.workers.dev";

// const BASE_PATH = "http://localhost:8787";

export const jsonFetcher = async (/** @type {string} */ url) => {
  // const res = await fetch(url, { responseType: "json" });
  const res = await fetch(`${BASE_PATH}${url}`, { responseType: "json" });
  const data = await res.json();
  return data;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  // const res = await fetch(url, {
  //   headers: { "x-app-userid": userId },
  //   responseType: "json",
  // });
  const res = await fetch(`${BASE_PATH}${url}`, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  const data = await res.json();
  return data;
};
