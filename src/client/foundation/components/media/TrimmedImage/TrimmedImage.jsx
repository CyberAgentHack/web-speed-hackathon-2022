import React from "react";
import styled from "styled-components";

const Img = styled.img`
  aspect-ratio: ${({ $height, $width }) => `${$width} / ${$height}`};
  height: auto;
  object-fit: ${({ $fit }) => $fit};
`;
/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, lazy = false, src, width }) => {
  // const [dataUrl, setDataUrl] = useState(null);
  const imgsrc = src.replace(".jpg", ".webp");
  const fit = width <= height ? "cover" : "contain";

  // useEffect(() => {
  //   const img = new Image();

  //   img.src = imgsrc;
  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = width;
  //     canvas.height = height;

  //     const isWidthSmaller = img.width <= img.height;
  //     const ratio = isWidthSmaller ? width / img.width : height / img.height;

  //     const ctx = canvas.getContext("2d");
  //     ctx.drawImage(
  //       img,
  //       -(img.width * ratio - width) / 2,
  //       -(img.height * ratio - height) / 2,
  //       img.width * ratio,
  //       img.height * ratio,
  //     );
  //     setDataUrl(canvas.toDataURL());
  //   };
  // }, [height, src, width]);

  return (
    <Img
      $fit={fit}
      $height={height}
      $width={width}
      loading={lazy ? "lazy" : "auto"}
      src={imgsrc}
      width={width}
    ></Img>
  );
};
