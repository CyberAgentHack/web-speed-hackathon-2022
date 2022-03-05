import React, { useEffect, useState } from "react";
import { getFetchSRCTrimmed } from "../../../utils/Cloudinary";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  src = getFetchSRCTrimmed(src, height, width)
  return <img src={src} />;
}
