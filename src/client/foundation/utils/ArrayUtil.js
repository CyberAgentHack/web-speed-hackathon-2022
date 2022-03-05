/**
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export const range = (start, end) => [...Array(end + 1).keys()].slice(start);
