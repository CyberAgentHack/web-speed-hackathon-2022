import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 * @property {boolean} widthAuto
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width, widthAuto }) => {
  const el = useRef(null);
  const wrapperEl = useRef(null);
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
    <Wrapper
      ref={wrapperEl}
      height={height}
      width={width}
      widthAuto={widthAuto}
    >
      <Img ref={el} loading="lazy" src={currentSRC} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ width, widthAuto }) => (widthAuto ? "auto" : `${width}px`)};
  height: ${({ height }) => `${height}px`};
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
