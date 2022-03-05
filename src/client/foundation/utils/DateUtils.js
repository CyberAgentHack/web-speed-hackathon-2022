import dayjs from "dayjs";
/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  return dayjs(dateLeft).isSame(dayjs(dateRight), "day");
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  return dayjs(ts).format("H:mm");
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (dayjs(closeAt).isBefore(now)) {
    return "投票締切";
  }

  if (dayjs(closeAt).isAfter(dayjs(now).add(2, "hours"))) {
    return "投票受付中";
  }

  return `締切${dayjs(closeAt).diff(now, "minutes")}分前`;
};
