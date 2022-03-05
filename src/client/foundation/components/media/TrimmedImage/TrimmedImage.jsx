/* eslint-disable react/jsx-sort-props */
import React from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return (
    <img
      src={src}
      height={height}
      loading="lazy"
      objectFit="fill"
      width={width}
    />
  );
};
