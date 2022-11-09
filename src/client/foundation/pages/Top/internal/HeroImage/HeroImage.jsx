import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  margin: 0 auto;
  height: auto;
`;

/**
 * @typedef Props
 * @type {object}
 */

/** @type {React.VFC<Props>} */
export const HeroImage = () => {
  return <Image alt="" height={735} src={"/assets/images/hero.avif"} width={1024} />;
};
