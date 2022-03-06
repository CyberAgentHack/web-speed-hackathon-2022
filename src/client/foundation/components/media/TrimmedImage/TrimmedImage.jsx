import React from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const StyledImage = styled.img`
    height: 100%;
    aspect-ratio: ${width} / ${height};
    object-fit: "contain";`

  return <StyledImage loading="lazy" src={src} />;
};

export const FixedImage = ({ height, src, width }) => {
  const StyledImage = styled.img`
    height: "${height}px";
    width: "${width}px";
    object-fit: "cover";`

  return <StyledImage loading="lazy" src={src} />;
};