import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1024px;
  height: 734.57px;
  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Image alt="" importance="high" src={url} />;
};
