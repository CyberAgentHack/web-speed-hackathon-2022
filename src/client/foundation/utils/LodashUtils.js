// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
export const difference = (arr1, arr2) =>
  [arr1, arr2].reduce((a, b) => a.filter(c => !b.includes(c)));

export const take = (arr, qty = 1) => [...arr].splice(0, qty);

export const without = (arr, ...args) =>
  arr.filter((item) => !args.includes(item));

export const sortBy = (items, key) =>
  [...items].sort((a, b) => (a[key] < b[key] ? -1 : 1));

export const range = (start, end) => 
  [...Array(end - start).keys()].map(k => k + start);
