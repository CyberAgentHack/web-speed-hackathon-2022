import React, { useEffect, useState } from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const url = src.split("/");
      url.splice(4, 0, `${width}x${height}`);
      setDataUrl(url.join("/"));
    };
  }, [height, src, width]);

  return <img src={dataUrl} loading="lazy" />;
};
