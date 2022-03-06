import { add, differenceInMinutes, isSameDay as isSameDayDFNS } from "date-fns";
import { format } from "date-fns-tz";
/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  return isSameDayDFNS(dateLeft, dateRight);
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  return format(new Date(ts), "H:mm", { timeZone: "Asia/Tokyo" });
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (new Date(closeAt) < new Date(now)) {
    return "投票締切";
  }

  if ((new Date(closeAt)) > add(new Date(now), {hours: 2})) {
    return "投票受付中";
  }

  return `締切${differenceInMinutes(new Date(closeAt), new Date(now))}分前`;
};
