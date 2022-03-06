import moment from "moment-timezone";
/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  return moment(dateLeft).isSame(moment(dateRight), "day");
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  return moment(ts).format("H:mm");
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (moment(closeAt).isBefore(now)) {
    return "投票締切";
  }

  if (moment(closeAt).isAfter(moment(now).add(2, "hours"))) {
    return "投票受付中";
  }

  return `締切${moment(closeAt).diff(now, "minutes")}分前`;
};
