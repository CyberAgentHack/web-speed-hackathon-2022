import React from "react";
import styled from "styled-components";

import { convertToWebP } from "../../../../utils/ImageConvertUtils";

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
export const HeroImage = ({ url }) => {
  return <Image alt="" src={convertToWebP(url, "jpg")} />;
};
