import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Img = styled.img`
  object-fit: cover;
`;

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {boolean?} lazyLoad
 * @property {"cover" | "contain" | undefined} objectFit
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({
  height,
  lazyLoad = false,
  src,
  width,
  objectFit = "cover",
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    // ref.current.height = height;
    img.onload = () => {
      // const canvas = document.createElement("canvas");
      // canvas.width = width;
      // canvas.height = height;

      const isWidthSmaller = img.width <= img.height;
      // const ratio = isWidthSmaller ? width / img.width : height / img.height;

      // ref.current.width = img.width * ratio;
      // ref.current.height = img.height * ratio;

      const imgAspect = img.width / img.height;
      const areaAspect = width / height;

      ref.current.style.objectFit = isWidthSmaller
        ? areaAspect < imgAspect
          ? "contain"
          : "cover"
        : imgAspect < areaAspect
        ? "contain"
        : "cover";
    };
  }, [height, src, width]);

  return (
    <Img
      decoding="async"
      ref={ref}
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
      onLoad={(e) => {
        const img = e.target;
        console.log(e.target.width, e.target.height);
        const isWidthSmaller = img.width <= img.height;
        const ratio = isWidthSmaller ? width / img.width : height / img.height;
        console.log(img.width * ratio, img.height * ratio);
      }}
      loading={lazyLoad ? "lazy" : undefined}
      src={src}
      width={width}
      // height={height}
      $objectFit={objectFit}
    />
  );
};
