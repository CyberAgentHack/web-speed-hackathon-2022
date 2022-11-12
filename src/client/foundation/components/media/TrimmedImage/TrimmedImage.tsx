import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

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

type TrimmedImageProps = {
  height: number;
  loading?: "lazy" | "eager";
  src: string;
  width: number;
};

export const TrimmedImage = ({ height, loading = "eager", src, width }: TrimmedImageProps) => {
  const [srcUrl, setSrcUrl] = useState("");

  useEffect(() => {
    setSrcUrl(src.replaceAll(".jpg", ".webp"));
  });

  if (srcUrl === "") {
    return <ImgContainer />;
  }

  return (
    <ImgContainer>
      <Suspense fallback={<div></div>}>
        {srcUrl === "" ? <></> : (
          <Image
            src={srcUrl}
            alt={""}
            height={height}
            width={width}
            loading={loading}
            style={{ objectFit: "cover", objectPosition: "center center" }}
            quality={50}
          />
        )}
      </Suspense>
    </ImgContainer>
  );
};
