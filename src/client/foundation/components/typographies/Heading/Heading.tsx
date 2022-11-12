import { NextPageWithLayout } from "next";
import React from "react";
import styled from "styled-components";

import { FontSize, Space } from "../../../styles/variables";

const styles = {
  h1: `font-size: ${FontSize.XX_LARGE}`,
  h2: `font-size: ${FontSize.X_LARGE}`,
  h3: `font-size: ${FontSize.LARGE}`,
};

type WrapperProps = {
  as: "h1" | "h2" | "h3"
}

const Wrapper = styled.h1<WrapperProps>`
  ${({ as }) => styles[as]}
  font-weight: bold;
  margin-bottom: ${Space * 1}px;
`;

type HeadingProps = {
  as: "h1" | "h2" | "h3"
}

export const Heading: NextPageWithLayout<HeadingProps> = ({ as, children }) => {
  return <Wrapper as={as}>{children}</Wrapper>;
};
