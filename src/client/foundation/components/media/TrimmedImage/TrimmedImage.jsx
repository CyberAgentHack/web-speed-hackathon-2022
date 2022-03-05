import React, {useEffect, useState, useRef } from "react";

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {height} height
 */


 export const TrimmedImage = ({ height, src, width }) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    if(height===width)return;
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
  if(height===width)return <img height={height} src={src} style={{objectFit:'cover'}} width={width} />
  return <img src={dataUrl} />;
};
// export const TrimmedImage = ({ height, src, width }) => {
//   const img = useRef();
//   const [fit, setFit] = useState("")
//   useEffect(()=>{
//     const imgAspect = img.current.naturalWidth / img.current.naturalHeight
//     const trimmedAspect = width/ height;
//     if(trimmedAspect > imgAspect){
//       setFit('contain')
//     }else setFit('cover')
//   },[])
//   return <img ref={img} height={height} src={src} style={{objectFit:fit}} width={width} />;
// };
