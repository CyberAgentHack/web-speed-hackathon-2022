import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
// NOTE: このコンポーネントはパフォマンス関係なさそう
export const HeroImage = ({ url }) => {
  return <Image alt="" src={url} />;
};
