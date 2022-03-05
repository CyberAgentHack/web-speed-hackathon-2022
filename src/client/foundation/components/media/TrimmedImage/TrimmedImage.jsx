import React, { useEffect, useState, useMemo, memo } from "react";
import styled from "styled-components";

const ImageAutoHeight = styled.img`
  height: auto;
`

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = memo(({ height, src, width }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
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
  }, [height, width]);

  return <ImageAutoHeight src={dataUrl} alt="" width={width} height={height} />;
});
