import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import { Color, FontSize, Space } from "../../../styles/variables";

const Wrapper = styled.div`
  align-items: center;
  color: ${Color.mono[400]};
  display: flex;
  font-size: ${FontSize.LARGE};
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: center;
  padding: ${Space * 2}px;
`;

/**
 * @typedef Props
 */

/** @type {React.VFC<Props>} */
export default function RaceResultSection() {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={["far", "hand-peace"]} />
      <div>結果はまだありません</div>
    </Wrapper>
  );
}
