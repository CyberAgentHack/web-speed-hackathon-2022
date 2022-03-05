import React from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

const CoveredImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ContainImage = styled.img`
  height: 100%;
  object-fit: contain;
`

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const StyledDiv = styled.div`
    width: ${width}px;
    height: ${height}px;
  `;

  if (width != height) {
    return <StyledDiv>
      <ContainImage loading="lazy" src={src} />
    </StyledDiv>;
  }else{
    return <StyledDiv>
      <CoveredImage loading="lazy" src={src} />
    </StyledDiv>;
  }
};
