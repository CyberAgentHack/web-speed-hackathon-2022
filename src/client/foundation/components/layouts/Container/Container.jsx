import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${16}px;
  padding-right: ${16}px;
  width: 100%;

  @media (min-width: 1024px) {
    max-width: calc(1024px + ${40}px * 2);
    padding-left: ${40}px;
    padding-right: ${40}px;
  }
`;

/** @type {React.FC} */
export const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
