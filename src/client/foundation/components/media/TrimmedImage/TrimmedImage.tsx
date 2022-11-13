import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

const ImgContainer = styled.div`
  overflow: hidden;
`;

type TrimmedImageProps = {
  height: number;
  src: string;
  width: number;
};

export const TrimmedImage = ({ height, src, width }: TrimmedImageProps) => {
  const [srcUrl, setSrcUrl] = useState("");

  useEffect(() => {
    setSrcUrl(src.replaceAll(".jpg", ".avif"));
  });

  if (srcUrl === "") {
    return <ImgContainer />;
  }

  return (
    <ImgContainer style={{ aspectRatio: `${width}/${height}` }}>
      {srcUrl === "" ? <></> : (
        <Image
          src={srcUrl}
          alt={""}
          height={height}
          width={width}
          style={{ objectFit: "cover", objectPosition: "center center", height: "100%" }}
          quality={50}
        />
      )}
    </ImgContainer>
  );
};
