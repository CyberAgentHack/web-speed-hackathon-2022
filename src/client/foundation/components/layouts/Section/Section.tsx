import { NextPageWithLayout } from "next";
import React from "react";
import styled from "styled-components";

import { BreakPoint, Color, Radius, Space } from "../../../styles/variables";

type WrapperProps = {
  $dark: boolean
  $shrink: boolean
}

const Wrapper = styled.section<WrapperProps>`
  background: ${({ $dark }) => ($dark ? Color.mono[800] : Color.mono[0])};
  color: ${({ $dark }) => ($dark ? Color.mono[0] : Color.mono[1000])};
  display: ${({ $shrink }) => ($shrink ? "inline-block" : "block")};
  margin-left: -${Space * 2}px;
  margin-right: -${Space * 2}px;
  padding: ${Space * 2}px;

  @media (min-width: ${BreakPoint.TABLET}px) {
    border-radius: ${Radius.MEDIUM};
    margin-left: 0;
    margin-right: 0;
    padding: ${Space * 5}px ${Space * 3}px;
  }
`;

type SectionProps = {
  dark?: boolean
  shrink?: boolean
}

export const Section: NextPageWithLayout<SectionProps> = ({ children, dark = false, shrink = false }) => {
  return (
    <Wrapper $dark={dark} $shrink={shrink}>
      {children}
    </Wrapper>
  );
};
