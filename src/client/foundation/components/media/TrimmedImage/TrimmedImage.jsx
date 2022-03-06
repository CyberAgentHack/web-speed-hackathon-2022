import React, { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {boolean} lazy
 * @property {boolean} length
 * @property {number} width
 * @property {height} height
 */
const Img = styled.img`
  object-fit: cover;
`;

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy, length, src, width }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const isWidthSmaller = img.width <= img.height;
      const ratio = isWidthSmaller ? width / img.width : height / img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        -(img.width * ratio - width) / 2,
        -(img.height * ratio - height) / 2,
        img.width * ratio,
        img.height * ratio,
      );
      setDataUrl(canvas.toDataURL());
    };
  }, [height, src, width]);

  return (
    <>
      {!length ? (
        <img alt="" loading={lazy ? "lazy" : "eagar"} src={dataUrl} />
      ) : (
        <Img
          alt=""
          height={height}
          loading={lazy ? "lazy" : "eagar"}
          src={src}
          width={width}
        />
      )}
    </>
  ); //上がヘッダー、下がプレイヤー
};
