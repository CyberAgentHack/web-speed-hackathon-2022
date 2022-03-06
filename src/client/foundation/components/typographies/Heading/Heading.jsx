import React from "react";
import styled from "styled-components";

import { FontSize, Space } from "../../../styles/variables";

const styles = {
  h1: `font-size: ${FontSize.XX_LARGE}`,
  h2: `font-size: ${FontSize.X_LARGE}`,
  h3: `font-size: ${FontSize.LARGE}`,
};

const Wrapper = styled.h1`
  ${({ as }) => styles[as]}
  font-weight: bold;
  margin-bottom: ${Space * 1}px;
`;

/**
 * @typedef Props
 * @property {'h1' | 'h2' | 'h3'} as
 */

/** @type {React.FC<Props>} */
export const Heading = ({ as, children }) => {
  return <Wrapper as={as}>{children}</Wrapper>;
};
