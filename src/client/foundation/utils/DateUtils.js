import moment from "moment-timezone";
/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const left = new Date(dateLeft);
  const right = new Date(dateRight);
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const date = new Date(ts);
  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  const closeDate = new Date(closeAt);
  if (closeDate.getTime() < now.getTime()) {
    return "投票締切";
  }

  // if (moment(closeAt).isAfter(moment(now).add(2, "hours"))) {
  //   return "投票受付中";
  // }
  if (closeDate.getTime() - now.getTime() > 1000 * 60 * 60 * 2) {
    return "投票受付中";
  }

  return `締切${Math.floor(
    (closeDate.getTime() - now.getTime()) / 1000 / 60,
  )}分前`;
};
