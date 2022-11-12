import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: ${({ height, width }) => width / height};
  max-width: ${({ width }) => width}px;
  max-height: ${({ height }) => height}px;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {boolean} lazy
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy, src, width }) => {
  return (
    <ImageWrapper
      height={height}
      loading={lazy ? "lazy" : "eager"}
      src={src}
      width={width}
    />
  );
};
