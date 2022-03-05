import React from "react";
import styled from "styled-components";

const Image = styled.img`
  object-fit: cover;
`;

/**
 * 正方形の場合はaspect比が最大(=1)となるため、object:coverで固定表示してしまって問題ない。
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {boolean?} lazyLoad
 */

/** @type {React.VFC<Props>} */
export const SquareTrimmedImage = ({
  height,
  lazyLoad = false,
  src,
  width,
}) => {
  return (
    <Image
      decoding="async"
      height={height}
      loading={lazyLoad ? "lazy" : undefined}
      src={src}
      width={width}
    />
  );
};
