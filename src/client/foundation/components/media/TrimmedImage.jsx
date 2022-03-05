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
  const img = new Image();

  useEffect(() => {
    let unmounted = false;
    img.src = src;
    img.onload = () => {
      if (!unmounted) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const isWidthSmaller = img.width <= img.height;
        const ratio = isWidthSmaller ? width / img.width : height / img.height;

        const ctx = canvas.getContext("2d");
        console.log(img.height + ", " + img.width);
        ctx.drawImage(
          img,
          -(img.width * ratio - width) / 2,
          -(img.height * ratio - height) / 2,
          img.width * ratio,
          img.height * ratio,
        );
        setDataUrl(canvas.toDataURL());
      }
    };
    return () => {
      unmounted = true;
    };
  }, [height, src, width]);

  return (
    <img
      src={dataUrl}
      // height={img.height}
      // width={img.width}
      importance="high"
      loading="async"
    />
  );
};
