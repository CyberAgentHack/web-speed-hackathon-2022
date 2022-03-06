export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await fetch(url, { responseType: "json" });

  if (!res.ok) {
    throw new Error(res.Error)
  }

  return await res.json();
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

  if (!res.ok) { 
    throw new Error(res.Error)
  }

  return await res.json();
};
