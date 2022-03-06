export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await (await fetch(url)).json();

  return res;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await (
    await fetch(url, {
      headers: { "x-app-userid": userId },
    })
  ).json();

  return res;
};
