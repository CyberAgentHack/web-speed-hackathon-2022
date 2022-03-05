/** @type {(path: string) => string} */
export const assets = (path) => `/assets/${path.replace(/^\//, "")}`;
