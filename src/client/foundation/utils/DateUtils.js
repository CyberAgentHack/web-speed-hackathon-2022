/**
 * @param {number} num
 * @returns {string} 07, 12
 */
export const zeroPadding = (num) => {
  return ("0" + num).slice(-2);
};

/**
 * @param {Date} d
 * @returns {string} YYYY-MM-DD HH:mm:ss
 */
export const getUTCFormatString = (d) => {
  const year = d.getUTCFullYear();
  const month = zeroPadding(d.getUTCMonth() + 1);
  const date = zeroPadding(d.getUTCDate());
  const hour = zeroPadding(d.getUTCHours());
  const minute = zeroPadding(d.getUTCMinutes());
  const second = zeroPadding(d.getUTCSeconds());
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

/**
 * @param {string} date
 * @returns {string}
 */
export const getFormatYMD = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${zeroPadding(d.getMonth() + 1)}-${zeroPadding(
    d.getDate(),
  )}`;
};

/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  const fl = new Date(getFormatYMD(dateLeft));
  const fr = new Date(getFormatYMD(dateRight));
  return fl.getTime() === fr.getTime();
};

/**
 * @param {Date} dateLeft
 * @param {Date} dateRight
 * @returns {boolean}
 */
export const isBefore = (dateLeft, dateRight) => {
  const fl = new Date(dateLeft);
  const fr = new Date(dateRight);
  return fl.getTime() < fr.getTime();
};

/**
 * @param {Date} dateLeft
 * @param {Date} dateRight
 * @returns {boolean}
 */
export const isAfter = (dateLeft, dateRight) => {
  const fl = new Date(dateLeft);
  const fr = new Date(dateRight);
  return fl.getTime() > fr.getTime();
};

/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {number}
 */
export const diffMinutes = (dateLeft, dateRight) => {
  const df = dateLeft.getTime() - dateRight.getTime();
  return Math.ceil(df / 1000 / 60);
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes()}`;
};

/**
 * @param {string} closeAt
 * @returns {string}
 */
export const formatCloseAt = (closeAt) => {
  const ca = new Date(closeAt);
  const tmp = new Date();
  const now = new Date();

  if (isBefore(ca, tmp)) {
    return "投票締切";
  }

  const twoHoursFuture = tmp.setHours(tmp.getHours() + 2);

  if (isAfter(ca, twoHoursFuture)) {
    return "投票受付中";
  }

  return `締切${diffMinutes(ca, now)}分前`;
};
