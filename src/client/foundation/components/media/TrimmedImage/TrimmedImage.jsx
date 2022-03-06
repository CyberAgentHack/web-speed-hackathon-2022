import React, { useEffect, useState } from "react";
import { getFetchSRC } from "../../../utils/Cloudinary";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */

const PLAYERS_IMAGE_DIR = "/assets/images/players/";
const RACE_IMAGE_DIR = "/assets/images/races/";

const RESIZE_PLAYERS_IMAGE_DIR = "/assets/images/resized/players/";
const RESIZE_RACE_IMAGE_DIR = "/assets/images/resized/races/";

const jpgToPngSRC = (src) => {
  return src.replace(".jpg", `.text`)
}

const getTrimmedSRC = (src, height, width) => {
  src = src.replace(PLAYERS_IMAGE_DIR, `${RESIZE_PLAYERS_IMAGE_DIR}${width}_${height}_`)
  src = src.replace(RACE_IMAGE_DIR, `${RESIZE_RACE_IMAGE_DIR}${width}_${height}_`)
  return jpgToPngSRC(src)
}

/** @type {React.VFC<Props>} */
// export const TrimmedImage = ({ height, src, width }) => {
//   // src = getFetchSRCTrimmed(src, height, width)
//   const [dataUrl, setDataUrl] = useState(null);
//   const url = getTrimmedSRC(src, height, width)

//   useEffect(() => {
//     fetch(url)
//       .then(response => response.text())
//       .then(data => {
//         // console.log(data)
//         setDataUrl(data);
//       })
//     // setDataUrl(response.text);
//   }, [height, src, width]);
//   return < img src = { dataUrl } />;
// }
export const TrimmedImage = ({ height, src, width }) => {
  src = getFetchSRC(src, width)
  src = src + ".webp"
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const isWidthSmaller = img.width <= img.height;
      const ratio = isWidthSmaller ? width / img.width : height / img.height;

      // const targetWidth = img.width * ratio
      // const targetHeight = img.height * ratio

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

  return <img src={dataUrl} />;
};
