import React from "react";
import styled from "styled-components";
import { getFetchSRC } from "../../../../utils/Cloudinary";

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
  // url = getFetchSRC(url, null)
  return <Image alt="" src={url} />;
};
