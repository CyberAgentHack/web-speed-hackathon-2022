/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const left = new Date(dateLeft);
  const right = new Date(dateRight);
  return left.getFullYear() === right.getFullYear() &&
         left.getMonth() === right.getMonth() &&
         left.getDate() === right.getDate();
  // return moment(dateLeft).isSame(moment(dateRight), "day");
};

export const formatDate = (dt) => {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
};

export const getStartOfDay = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return Math.floor(start.getTime()/1000);
};

export const getEndOfDay = (date) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return Math.floor(end.getTime()/1000);
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  // 分は 二桁
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  // return moment(ts).format("H:mm");
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  // 同じ時間は flase
  // if (moment(closeAt).isBefore(now)) {
  //   return "投票締切";
  // }
  if (Date.parse(closeAt) < now) {
    return "投票締切";
  }

  // if (moment(closeAt).isAfter(moment(now).add(2, "hours"))) {
  //   return "投票受付中";
  // }
  if (Date.parse(closeAt) > now.getTime() + 2 * 60 * 60 * 1000) {
    return "投票受付中";
  }

  // return `締切${moment(closeAt).diff(now, "minutes")}分前`;
  return `締切${Math.floor((Date.parse(closeAt) - now.getTime()) / 1000 / 60)}分前`;
};
