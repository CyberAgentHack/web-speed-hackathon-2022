import React from "react";
import styled from "styled-components";

import { BreakPoint, Color, Radius, Space } from "../../../styles/variables";

const Wrapper = styled.section`
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

/**
 * @typedef Props
 * @property {boolean} dark
 * @property {boolean} shrink
 */

/** @type {React.FC<Props>} */
export const Section = ({ children, dark, shrink }) => {
  return (
    <Wrapper $dark={dark} $shrink={shrink}>
      {children}
    </Wrapper>
  );
};

const PlaceholderWrapper = styled.section`
  background: ${({ $dark }) => ($dark ? Color.mono[800] : Color.mono[0])};
  color: ${({ $dark }) => ($dark ? Color.mono[0] : Color.mono[1000])};
  display: ${({ $shrink }) => ($shrink ? "inline-block" : "block")};
  margin-left: -${Space * 2}px;
  margin-right: -${Space * 2}px;
  padding: ${Space * 2}px;
  width: 100vw;

  @media (min-width: ${BreakPoint.MOBILE}px) {
    width: 432px;
    height: 297px;
  }

  @media (min-width: ${BreakPoint.TABLET}px) {
    border-radius: ${Radius.MEDIUM};
    margin-left: 0;
    margin-right: 0;
    padding: ${Space * 5}px ${Space * 3}px;
    width: 448px;
    height: 345px;
  }
`;

/**
 * @typedef Props
 * @property {boolean} dark
 * @property {boolean} shrink
 */

/** @type {React.FC<Props>} */
export const PlaceholderSection = ({
  children,
  dark,
  height,
  shrink,
  width,
}) => {
  return (
    <PlaceholderWrapper
      $dark={dark}
      $shrink={shrink}
      height={height}
      width={width}
    >
      {children}
    </PlaceholderWrapper>
  );
};
