// import styled from "styled-components";
import React, { useEffect, useState } from "react";

const canvas = document.createElement("canvas");

// const Image = styled.img`
//   object-fit: contain;
// `;

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
      canvas.width = width;
      canvas.height = height;

      const isWidthSmaller = img.width <= img.height;
      const ratio = isWidthSmaller ? width / img.width : height / img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        -(img.width * ratio - width) / 2,
        -(img.height * ratio - height) / 2,
        img.width * ratio,
        img.height * ratio,
      );
      setDataUrl(canvas.toDataURL());
    };
  }, [height, src, width]);

  // return <Image src={src} width={width} height={height} loading="lazy" />;
  // eslint-disable-next-line react/jsx-sort-props
  return <img src={dataUrl} loading="lazy" width={width} height={height} />;
};
