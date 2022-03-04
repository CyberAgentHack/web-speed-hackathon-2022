/** @type {(path: string) => string} */
export const assets = (path) => `/assets/${path.replace(/^\//, "")}`;

export const jpg2webp = (path) => path.replace("jpg", "webp");
