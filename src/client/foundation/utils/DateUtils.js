/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  if (!ts) return "";

  const date = parseISOString(ts);
  return `${date.getHours()}:${date.getMinutes()}`;
};

/**
 *
 * @param {Date} ts
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return "";

  return `${date.getFullYear()}/${toDoubleDigits(
    date.getMonth() + 1,
  )}/${toDoubleDigits(date.getDate())}`;
};

const toDoubleDigits = function (num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
};

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date().getTime()) => {
  if (new Date(closeAt).getTime() - now < 0) {
    return "投票締切";
  }

  if (new Date(closeAt).getTime() - now > 1000 * 60 * 60 * 2) {
    return "投票受付中";
  }

  return `締切${Math.floor(
    (new Date(closeAt).getTime() - now) / (1000 * 60),
  )}分前`;
};

/**
 * @param {string} s
 * @returns {Date}
 */
export function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
