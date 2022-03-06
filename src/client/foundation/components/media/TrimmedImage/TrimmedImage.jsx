import React from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <img alt="" decoding='async' loading='async' src={src.slice(0,-3)+'webp'} style={{height: height+'px', width: width+'px'}} />;
};
