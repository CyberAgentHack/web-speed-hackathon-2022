import React from "react";
import styled from "styled-components";


import { Color, FontSize, Space } from "../../../../../styles/variables";

import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => <IcoMoon iconSet={iconSet} {...props} />;
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
export const RaceResultSection = () => {
  return (
    <Wrapper>
      <Icon icon="hand-peace" size={20} />
      <div>結果はまだありません</div>
    </Wrapper>
  );
};
