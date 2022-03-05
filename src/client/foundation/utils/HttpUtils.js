export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await fetch(url).then((res) => res.json());
  return res;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await fetch(url, {
    headers: { "x-app-userid": userId },
  })
    .then((res) => res.json())
    .catch(console.error);
  return res;
};
