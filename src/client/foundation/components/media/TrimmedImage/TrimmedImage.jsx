import React, { useEffect, useState } from "react";
import styled from "styled-components";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */


const ImageH = styled.img`
  height: 100%;
  width: auto;
`

const ImageW = styled.img`
  height: auto;
  width: 100%;
`
/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width, nolazy }) => {
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

  return nolazy ? (
    width > height ? <ImageW width={width} height={height} src={dataUrl} /> : <ImageH height={height} width={width} src={dataUrl} />)
    : (
      width > height ? <ImageW width={width} height={height} src={dataUrl} /> : <ImageH height={height} width={width} src={dataUrl} />);
};
