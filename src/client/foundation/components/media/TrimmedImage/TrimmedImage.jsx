import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.img`
  object-fit: cover;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <ImageWrapper height={height} src={src} width={width} />;
};
