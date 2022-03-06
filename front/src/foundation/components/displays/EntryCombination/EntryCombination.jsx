import React from "react";
import styled from "styled-components";

import { Color, Space } from "../../../styles/variables";

const Wrapper = styled.div`
  display: flex;

  div {
    border: 1px solid ${Color.mono[900]};
    font-weight: bold;
    height: 24px;
    text-align: center;
    width: 24px;

    &:not(:last-child) {
      margin-right: ${Space * 1 - 1}px;
      position: relative;

      ::after {
        border: 2px solid ${Color.mono[900]};
        content: "";
        left: 100%;
        position: absolute;
        top: calc(50% - 1px);
        width: ${Space * 1}px;
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
