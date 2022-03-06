import React from "react";
import styled from "styled-components";

import { convertToAVIF } from "../../../../utils/ImageConvertUtils";

const Image = styled.img`
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
export const HeroImage = ({ url }) => {
  return (
    <Image alt="" src={convertToAVIF(url, "jpg")} width={1024} height={735} />
  );
};
