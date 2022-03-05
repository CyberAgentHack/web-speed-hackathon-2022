/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const leftDate = new Date(dateLeft);
  const rightDate = new Date(dateRight);
  return (
    leftDate.getFullYear() === rightDate.getFullYear() &&
    leftDate.getMonth() === rightDate.getMonth() &&
    leftDate.getDate() === rightDate.getDate()
  );
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const date = new Date(ts);
  return `${date.getHours()}:${date.getMinutes()}`;
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

  const twoHoursLater = new Date(now);
  twoHoursLater.setHours(twoHoursLater.getHours() + 2);
  if (new Date(closeAt) > twoHoursLater) {
    return "投票受付中";
  }

  return `締切${Math.floor(
    (new Date(closeAt) - new Date(now)) / 1000 / 60,
  )}分前`;
};
