export const jsonFetcher = async (/** @type {string} */ url) => {
  let res;
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      res = json;
    });
  return res;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  let res;
  await fetch(url, {
    headers: { "x-app-userid": userId },
  })
    .then((response) => response.json())
    .then((json) => {
      res = json;
    });
  return res;
};
