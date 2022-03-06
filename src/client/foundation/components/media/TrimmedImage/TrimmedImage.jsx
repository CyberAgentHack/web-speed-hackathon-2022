import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WrapperSvg = styled.svg`
  display: block;
  height: auto;
  max-width: 100%;
`

/**
 * @typedef Props
 * @property {string | undefined} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const [position, setPosition] = useState({height: 0, width: 0, x: 0, y: 0});


  useEffect(() => {
    if (src === undefined) {
      return;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const isWidthSmaller = img.width <= img.height;
      const ratio = isWidthSmaller ? width / img.width : height / img.height;

      setPosition({
        height: Math.round(img.height * ratio),
        width: Math.round(img.width * ratio),
        x: Math.round(-(img.width * ratio - width) / 2),
        y: Math.round(-(img.height * ratio - height) / 2),
      });
    };
  }, [src, height, width]);

  return (
    <WrapperSvg height={height} preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`} width={width}>
      <image height={position.height} href={src} width={position.width} x={position.x} y={position.y} />
    </WrapperSvg>
  )
}