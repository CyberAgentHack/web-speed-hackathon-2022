import dayjs from "dayjs"
/**
* @param {string} dateLeft
* @param {string} dateRight
* @returns {boolean}
*/
export const isSameDay = (dateLeft, dateRight) => {
  const d1 = new Date(dateLeft);
  const d2 = new Date(dateRight);
  return d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
};

/**
*
* @param {string} ts
* @returns {string}
*/
export const formatTime = (ts) => {
  const date = new Date(ts)
  return `${date.getHours()}:${date.getMinutes()}`
};


/**
* @param {Date} day
* @param {Date} from
* @returns {boolean}
*/
export const isBeforeDay = (day, from) => {
  return day > from;
}

/**
* @param {Date} day
* @param {Date} from
* @returns {boolean}
*/
export const isAfterDay = (day, from) => {
  return day < from;
}

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (isBeforeDay(now, new Date(closeAt))) {
    return "投票締切";
  }

  if(dayjs(closeAt).isAfter(dayjs(now).add(2, "hours"))) {
    return "投票受付中";
  }

  return `締切${dayjs(closeAt).diff(now, "minutes")}分前`;
};



// /**
//  * @param {string} closeAt
//  * @param {number | Date} now
//  * @returns {string}
//  */
// export const formatCloseAt = (closeAt, now = new Date()) => {
//   if (isBeforeToday(closeAt)) {
//     return "投票締切";
//   }

//   if (getDiffMinutes(closeAt, now) > 120) {
//     return "投票受付中";
//   }

//   return `締切${getDiffMinutes(closeAt, now)}分前`;
// };
