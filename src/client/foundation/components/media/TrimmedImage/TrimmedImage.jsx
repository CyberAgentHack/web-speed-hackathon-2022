import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  object-fit: ${({ $fit }) => $fit};
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const fit = width > height ? "contain" : "cover";
  const imageSrc = src.replace(".jpg", ".webp");
  return <Image $fit={fit} $height={height} $width={width} src={imageSrc} />;
};
