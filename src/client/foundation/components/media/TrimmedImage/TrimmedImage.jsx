import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  aspect-ratio: ${({ $height, $width }) => `${$width} / ${$height}`};
  height: auto;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {boolean} lazy
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy, src, width }) => {
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
  }, [height, src, width]);

  return (
    <Img
      $height={height}
      $width={width}
      loading={lazy ? "lazy" : "eager"}
      src={dataUrl}
      width={width}
    />
  );
};
