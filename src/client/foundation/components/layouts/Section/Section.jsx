import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  background: ${({ $dark }) => ($dark ? "#292524" : "#fff")};
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
  display: ${({ $shrink }) => ($shrink ? "inline-block" : "block")};
  margin-left: -${8 * 2}px;
  margin-right: -${8 * 2}px;
  padding: ${8 * 2}px;

  @media (min-width: 1024px) {
    border-radius: 12px;
    margin-left: 0;
    margin-right: 0;
    padding: ${8 * 5}px ${8 * 3}px;
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
