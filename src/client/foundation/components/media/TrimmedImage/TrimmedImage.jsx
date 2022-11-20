import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  aspect-ratio: ${({ height, width }) => `${width} / ${height}`};
  max-width: ${({ width }) => width}px;
  max-height: ${({ height }) => height}px;
`;

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy, src, width }) => {
  return (
    <StyledImage
      height={height}
      loading={lazy ? "lazy" : "eager"}
      src={src}
      width={width}
    />
  );
};
