/* eslint-disable react/jsx-sort-props */
import * as React from "react";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  aspect-ratio: 400 / 225;
  height: auto;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage2 = ({ src, width, height }) => (
  <Image src={src} width={width} height={height} />
);
