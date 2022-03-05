import React from "react";
import styled from "styled-components";

import { FontSize, Space } from "../../../styles/variables";

const styles = {
  h1: `font-size: 2rem`,
  h2: `font-size: 1.5rem`,
  h3: `font-size: 1.25rem`,
};

const Wrapper = styled.h1`
  ${({ as }) => styles[as]}
  font-weight: bold;
  margin-bottom: ${8 * 1}px;
`;

/**
 * @typedef Props
 * @property {'h1' | 'h2' | 'h3'} as
 */

/** @type {React.FC<Props>} */
export const Heading = ({ as, children }) => {
  return <Wrapper as={as}>{children}</Wrapper>;
};
