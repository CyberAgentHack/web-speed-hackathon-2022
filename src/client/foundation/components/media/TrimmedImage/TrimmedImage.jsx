import React from "react";
import styled from "styled-components";

const Img = styled.img`
  aspect-ratio: ${({ $height, $width }) => `${$width} / ${$height}`};
  height: auto;
  object-fit: ${({ $fit }) => $fit};
`;
/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy=false, src, width }) => {
  const imgsrc = src.replace(".jpg", ".webp");
  const fit = width <= height ? "cover" : "contain";

  return (
    <Img
      $fit={fit}
      $height={height}
      $width={width}
      loading={lazy ? "lazy" : "auto"}
      src={imgsrc}
      width={width}
    />
  );
};
