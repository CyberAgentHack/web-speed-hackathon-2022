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
  const windowWidth = window.innerWidth;
  const calculatedWidth =
    widthAuto && windowWidth < width ? "auto" : `${width}px`;
  const calculatedHeight =
    widthAuto && windowWidth < width ? "auto" : `${height}px`;
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
    <Wrapper ref={wrapperEl} height={calculatedHeight} width={calculatedWidth}>
      <Img
        ref={el}
        height={height}
        loading="lazy"
        src={currentSRC}
        width={width}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  aspect-ratio: 361/ 203;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
