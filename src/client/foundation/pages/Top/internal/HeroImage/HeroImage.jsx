import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {number} height
 * @property {string} url
 * @property {number} width
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ height, url, width }) => {
  return <Image alt="" height={height} src={url} width={width} />;
};
