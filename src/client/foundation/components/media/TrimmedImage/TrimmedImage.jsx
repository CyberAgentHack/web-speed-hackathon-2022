import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Size
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const el = useRef(null);
  const [currentSRC, setCurrentSRC] = useState("");
  // Lazy ロード
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const isLazySupported = "loading" in HTMLImageElement.prototype;
    if (isLazySupported) {
      setCurrentSRC(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        observer.disconnect();
        setCurrentSRC(src);
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(el.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);
  return (
    <Wrapper height={height} width={width}>
      <Img ref={el} loading="lazy" src={currentSRC} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
