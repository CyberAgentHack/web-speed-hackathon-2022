/** @type {(path: string) => string} */
export const assets = (path) => `/assets/${path.replace(/^\//, "")}`;

export const jpg2avif = (path) => path.replace("jpg", "avif");
