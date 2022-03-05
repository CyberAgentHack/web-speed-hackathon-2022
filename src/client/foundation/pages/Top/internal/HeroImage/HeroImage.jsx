import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  aspect-ratio: 1024 / 735;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Image alt="" decoding="async" src={url} />;
};
