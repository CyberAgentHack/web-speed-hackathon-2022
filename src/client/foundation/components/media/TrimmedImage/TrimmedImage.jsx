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
    const loadImage = () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });
    };
    loadImage().then((res) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const isWidthSmaller = res.width <= res.height;
      const ratio = isWidthSmaller ? width / res.width : height / res.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        res,
        -(res.width * ratio - width) / 2,
        -(res.height * ratio - height) / 2,
        res.width * ratio,
        res.height * ratio,
      );
      setDataUrl(canvas.toDataURL());
    });
  }, [height, src, width]);

  return <img src={dataUrl} />;
};
