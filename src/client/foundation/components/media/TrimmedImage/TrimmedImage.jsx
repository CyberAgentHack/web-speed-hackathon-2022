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
  const ContainImage = styled.img`
    height: 100%;
    aspect-ratio: ${props => props.width} / ${props => props.height};
    object-fit: contain;`
  return <ContainImage height={height} loading="lazy" src={src} width={width} />;
};

const CoverImage = styled.img`
  object-fit: cover;`

/** @type {React.VFC<Props>} */
export const FixedImage = ({ height, src, width }) => {
  return <CoverImage height={height} loading="lazy" src={src} width={width} />;
};