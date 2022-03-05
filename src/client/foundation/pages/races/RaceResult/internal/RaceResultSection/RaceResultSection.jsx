import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  color: #a8a29e;
  display: flex;
  font-size: 1.25rem;
  font-weight: bold;
  gap: ${8 * 2}px;
  justify-content: center;
  padding: ${8 * 2}px;
`;

/**
 * @typedef Props
 */

/** @type {React.VFC<Props>} */
export const RaceResultSection = () => {
  return (
    <Wrapper>
      <i className="far fa-hand-peace" />
      <div>結果はまだありません</div>
    </Wrapper>
  );
};
