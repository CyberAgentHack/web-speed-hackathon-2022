import React from "react";
import styled from "styled-components";

const Image = styled.img.attrs(() => ({
  height: 735,
  width: 1024
}))`
  display: block;
  margin: 0 auto;
  height: auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = () => {
  return <Image alt="" src="/assets/images/resized/hero.avif" />;
};
