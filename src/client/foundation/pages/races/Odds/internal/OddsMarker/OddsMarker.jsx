import React from "react";
import styled from "styled-components";

import { Space } from "../../../../../styles/variables";

const Wrapper = styled.span`
  background: rgba(74, 222, 128, ${({ $odds }) => Math.min(5 / $odds, 1.0)});
  font-family: "Senobi-Gothic", sans-serif;
  font-weight: bold;
  padding: ${Space / 2}px ${Space * 1}px;
  font-display: swap;
`;

const PlaceHolderWrapper = styled.span`
  font-family: "Senobi-Gothic", sans-serif;
  font-weight: bold;
  padding: ${Space / 2}px ${Space * 1}px;
  color: rgba(0, 0, 0, 0);
  user-select: none;
  font-display: swap;
`;

/**
 * @typedef Props
 * @property {number} odds
 */

/** @type {React.FC<Props>} */
export const OddsMarker = ({ odds }) => {
  if (odds) return <Wrapper $odds={odds}> {odds.toFixed(1)}</Wrapper>;
  else return <PlaceHolderWrapper>000.0</PlaceHolderWrapper>;
};
