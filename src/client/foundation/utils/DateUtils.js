/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const left = new Date(dateLeft);
  const right = new Date(dateRight);
  return "a"+left.getFullYear()+left.getMonth()+left.getDay() === "a"+right.getFullYear()+right.getMonth()+right.getDay()
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  console.log(ts)
  const t=new Date(ts)
  return t.getHours()+":"+t.getMinutes()
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  const closeAtDate = new Date(closeAt);
  if (now.getTime() > closeAtDate.getTime()) {
    return "投票締切";
  }

  // if (moment(closeAt).isAfter(moment(now).add(2, "hours"))) {
  if (now.getTime()+2*60*60*1000 < closeAtDate.getTime()) {
    return "投票受付中";
  }

  // return `締切${moment(closeAt).diff(now, "minutes")}分前`;
  return `締切${(now.getTime()-closeAtDate.getTime())/1000/60}分前`;
};
