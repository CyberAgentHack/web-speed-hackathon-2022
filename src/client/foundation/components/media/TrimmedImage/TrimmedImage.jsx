import React from "react";
import styled from "styled-components";

const Image = styled.img.attrs((props) => ({
  height: props.height,
  width: props.width,
}))`
  object-fit: contain;
  aspect-ratio: ${({height, width}) => `${width} / ${height}`};
  height: auto;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <Image height={height} src={src}  width={width} />;
};
