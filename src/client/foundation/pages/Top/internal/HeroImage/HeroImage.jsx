import React from "react";
import styled from "styled-components";

const Image = styled.img.attrs(() => ({
  height: 735,
  width: 1024
}))`
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
