import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  align-items: center;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:disabled {
    cursor: initial;
  }
`;

/**
 * @typedef Props
 * @property {string=} className
 */

/** @type {React.FC<Props & React.ButtonHTMLAttributes>} */
export const BaseButton = (props) => {
  return <Wrapper {...props} />;
};
