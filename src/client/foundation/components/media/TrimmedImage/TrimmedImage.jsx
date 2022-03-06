// import React, { useEffect, useState } from "react";
import React from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <img alt="" src={`${src.slice(0, -5)}-${width}_${height}.webp`} width={width} />;
};
