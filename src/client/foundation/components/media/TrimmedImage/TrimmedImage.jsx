import React, { useEffect, useState } from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <img height={height} src={src} style={{objectFit:"cover"}} width={width} />;
};
