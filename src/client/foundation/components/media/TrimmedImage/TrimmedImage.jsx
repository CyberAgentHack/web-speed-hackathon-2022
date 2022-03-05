import React, { useEffect, useState } from "react";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Size
 * @property {number} width
 * @property {number} height
 */

/** @type {(cv: Size, img: Size) => Size} */
const calcImageSize = (cv, img) => {
  const constrainedHeight = cv.width * (img.height / img.width);

  if (constrainedHeight >= cv.height) {
    return {
      height: constrainedHeight,
      width: cv.width,
    };
  }

  const constrainedWidth = cv.height * (img.width / img.height);

  return {
    height: cv.height,
    width: constrainedWidth,
  };
};

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const size = calcImageSize(
        { height: canvas.height, width: canvas.width },
        { height: img.height, width: img.width },
      );

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        -(size.width - canvas.width) / 2,
        -(size.height - canvas.height) / 2,
        size.width,
        size.height,
      );
      setDataUrl(canvas.toDataURL());
    };
  }, [height, src, width]);

  return <img src={dataUrl} />;
};
