import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

const ImgContainer = styled.div`
  overflow: hidden;
`;

const Img = styled.img`
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {"eager" | "lazy" | undefined} loading
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, loading, src, width }) => {
  const [srcUrl, setSrcUrl] = useState("");

  useEffect(() => {
    setSrcUrl(src.replaceAll(".jpg", ".webp"));
  });

  if (srcUrl === "") {
    return <ImgContainer />;
  }

  return (
    <ImgContainer>
      {/*<Img alt={""} height={0} loading={loading} src={srcUrl} width={width} />*/}
      <Image
        src={srcUrl}
        alt={""}
        height={height}
        width={width}
        loading={loading}
        style={{ objectFit: "cover", objectPosition: "center center" }}
        quality={50}
        unoptimized
      >
      </Image>
    </ImgContainer>
  );
};
