import React from "react";
import styled from "styled-components"

const Image = styled.img`
  object-fit: cover;
`

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {boolean?} lazyLoad
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazyLoad = false, src, width }) => {
  return <Image decoding="async" height={height} loading={lazyLoad ? "lazy" : undefined} src={src} width={width} />;
};
