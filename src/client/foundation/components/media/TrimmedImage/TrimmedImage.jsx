import React from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const StyledDiv = styled.div`
    width: ${width}px;
    height: ${height}px;
  `;

  return <StyledDiv>
    <StyledImage loading="lazy" src={src} />
  </StyledDiv>;
};
