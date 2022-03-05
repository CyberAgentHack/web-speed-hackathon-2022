import React, { useEffect, useState, useMemo, memo } from "react";
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
export const TrimmedImage = memo(({ height, src, width }) => {
  const [position, setPosition] = useState({x: 0, y: 0, width: 0, height: 0});


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
        x: Math.round(-(img.width * ratio - width) / 2),
        y: Math.round(-(img.height * ratio - height) / 2),
        width: Math.round(img.width * ratio),
        height: Math.round(img.height * ratio),
      });
    };
  }, [src, height, width]);

  return (
    <WrapperSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <image x={position.x} y={position.y} width={position.width} height={position.height} href={src} />
    </WrapperSvg>
  )
  /*return (
    <Wrapper $width={width} $height={height}>
      <PositionedImage
        src={src}
        alt=""
        $width={position.width}
        $height={position.height}
        $x={position.x}
        $y={position.y}
      />
    </Wrapper>
  )*/
});
