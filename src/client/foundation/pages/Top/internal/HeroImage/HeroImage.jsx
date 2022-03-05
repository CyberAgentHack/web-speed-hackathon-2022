import React from "react";
import styled from "styled-components";

const Image = styled.img`
  aspect-ratio: auto 1024 / 735;
  height: auto;
  display: block;
  margin: 0 auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Image alt="" src={url} />;
};
