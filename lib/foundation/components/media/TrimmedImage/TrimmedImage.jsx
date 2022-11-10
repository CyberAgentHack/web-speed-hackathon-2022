import React from "react";
import styled from "styled-components";
import Image from "next/image";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {"eager" | "lazy" | undefined} loading
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, loading, src, width }) => {
  const ImgContainer = styled.div`
    position: relative; 
    aspect-ratio: ${width} / ${height};
    max-height: ${height}px;
    max-width: ${width}px;
    overflow: hidden;
  `;

  const Img = styled.img`
    height: 100%;
    object-fit: cover;
    object-position: center center;
    width: ${width}px;
  `;

  if (src === "") {
    return <ImgContainer />;
  }

  const srcUrl = src.replaceAll(".jpg", ".avif");

  return (
    <ImgContainer>
      <Image
        alt=""
        loading={loading}
        width={width}
        src={srcUrl}
        fill
        objectFit={"cover"}
        objectPosition={"center center"}
      />
    </ImgContainer>
  );
};
