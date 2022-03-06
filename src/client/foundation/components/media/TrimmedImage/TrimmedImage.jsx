import React from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, type, width }) => {
  const StyledImage = styled.img`
    height: 100%;
    aspect-ratio: ${width} / ${height};
    object-fit: ${type};`

  return <StyledImage loading="lazy" src={src} />;
};
