//const origin = process.env.NODE_ENV === "development" ? "" : "https://wsh-2022-cathiecode.herokuapp.com"
const origin = "";

export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await (await fetch(origin + url)).json();
  return res;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await (await fetch(origin + url, {
    headers: { "x-app-userid": userId },
  })).json();
  return res;
};
