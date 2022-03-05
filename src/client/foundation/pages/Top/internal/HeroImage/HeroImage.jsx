import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  aspect-ratio: 1104 / 792;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = () => {
  return <Image alt="CyberTicker Hero Image" src="/assets/images/hero.avif" />;
};
