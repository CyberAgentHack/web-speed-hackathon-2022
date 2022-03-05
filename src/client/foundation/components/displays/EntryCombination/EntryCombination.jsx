import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;

  div {
    border: 1px solid #1c1917;
    font-weight: bold;
    height: 24px;
    text-align: center;
    width: 24px;

    &:not(:last-child) {
      margin-right: ${8 * 1 - 1}px;
      position: relative;

      ::after {
        border: 2px solid #1c1917;
        content: "";
        left: 100%;
        position: absolute;
        top: calc(50% - 1px);
        width: ${8 * 1}px;
      }
    }
  }
`;

/**
 * @typedef Props
 * @property {number[]} numbers
 */

/** @type {React.VFC<Props>} */
export const EntryCombination = ({ numbers }) => {
  return (
    <Wrapper>
      {numbers.map((key, j) => (
        <div key={j}>{key}</div>
      ))}
    </Wrapper>
  );
};
