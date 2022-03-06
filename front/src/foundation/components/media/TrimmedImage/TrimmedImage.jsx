import * as React from "react";
import styled from "styled-components";

const Image = styled.img`
  object-fit: cover;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => (
  // eslint-disable-next-line react/jsx-sort-props
  <Image src={src} width={width} height={height} loading="lazy" />
);
