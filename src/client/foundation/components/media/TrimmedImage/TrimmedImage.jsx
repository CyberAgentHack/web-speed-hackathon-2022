import React from "react";
import styled from "styled-components";

const CoverImage = styled.img`
  object-fit: cover;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {boolean} lazy
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy, src, width }) => {
  return (
    <CoverImage
      height={height}
      loading={lazy ? "lazy" : "eager"}
      src={src}
      style={{ paddingLeft: lazy ? 0 : 44, paddingRight: lazy ? 0 : 44 }}
      width={width}
    />
  );
};
