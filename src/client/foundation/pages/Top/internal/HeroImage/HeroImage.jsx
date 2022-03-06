import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  aspect-ratio: 1024 / 735;
  height: auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Image alt="" src={url} width="1024" />;
};
