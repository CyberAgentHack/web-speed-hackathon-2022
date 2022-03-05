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

  box-sizing: ${({ $custom }) => ($custom ? "content-box" : "border-box")};
  max-width: ${({ $custom }) => ($custom ? "100%" : "")};

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
export const Section = ({ children, custom, dark, shrink }) => {
  return (
    <Wrapper $custom={custom} $dark={dark} $shrink={shrink}>
      {children}
    </Wrapper>
  );
};
