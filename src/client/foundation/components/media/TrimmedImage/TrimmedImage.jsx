import React from "react";
import styled from "styled-components";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const Img = styled.img`
    height: ${height}px;
    object-fit: cover;
    object-position: center center;
    width: ${width}px;
  `

  const srcUrl = src.replaceAll('.jpg', '.avif')

  return <Img alt="" height={height} loading={"lazy"} src={srcUrl} width={width} />;
};
