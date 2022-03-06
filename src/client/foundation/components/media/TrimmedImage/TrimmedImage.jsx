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
  // const [dataUrl, setDataUrl] = useState(null);s

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = src;
  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = width;
  //     canvas.height = height;

  //     const isWidthSmaller = img.width <= img.height;
  //     const ratio = isWidthSmaller ? width / img.width : height / img.height;

  //     const ctx = canvas.getContext("2d");
  //     ctx.drawImage(
  //       img,
  //       -(img.width * ratio - width) / 2,
  //       -(img.height * ratio - height) / 2,
  //       img.width * ratio,
  //       img.height * ratio,
  //     );
  //     setDataUrl(canvas.toDataURL());
  //   };
  // }, [height, src, width]);
  return <img alt="" height={height} src={`${src.slice(0, -5)}-${width}_${height}.webp`} width={width} />;
};
