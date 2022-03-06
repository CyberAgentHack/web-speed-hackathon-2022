export const createFetchError = (res) =>
  new Error(`Failed to fetch(${res.status}): ${res.statusText}`);

export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await fetch(url, { responseType: "json" });
  if (!res.ok) throw createFetchError(res);
  return res.json();
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await fetch(url, {
    headers: { "x-app-userid": userId },
    responseType: "json",
  });
  if (!res.ok) throw createFetchError(res);
  return res.json();
};
