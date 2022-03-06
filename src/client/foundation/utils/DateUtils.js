/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  return new Date(dateLeft).toDateString().substring(8, 10) === new Date(dateRight).toDateString().substring(8, 10);
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const date = new Date(ts)
  const hh = `0${date.getHours()}`.slice(-2)
  const mm = `0${date.getMinutes()}`.slice(-2)
  return `${hh}:${mm}`;
};

/**
 * @param {string} closeAt
 * @param {Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  const diffMin = Math.floor((new Date(closeAt).getTime() - now.getTime()) / 1000 / 60)

  if (new Date(closeAt).getTime() < now.getTime()) {
    return "投票締切";
  }

  now.setHours(now.getHours() + 2)
  if (new Date(closeAt).getTime() > now.getTime()) {
    return "投票受付中";
  }

  return `締切${diffMin}分前`;
};

/**
 * @param {string} ts
 * @returns {number}
 */
export const getUnixSec = (ts) => {
  const unixMs = new Date(ts).getTime();
  const unixSec = Math.floor( unixMs / 1000 );
  return unixSec
};