import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Image alt="" height="2160px" src={url} width="1550px" />;
};
