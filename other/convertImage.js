

const convertImage = async (width, height) => {
    if (process.argv.length != 3) {
    console.log("Abort");
    return
}
const input_file = process.argv[2];


const sharp = require('sharp');
const image = await sharp(input_file);
const meta = await image.metadata();

const isWidthSmaller = meta.width <= meta.height;
const ratio = isWidthSmaller ? width / meta.width : height / meta.height;
image
    .resize(Math.round(meta.width * ratio),Math.round (meta.height * ratio)) 
    .resize(width,height,{fit:"cover"}) 
    .jpeg({quality: 100})
    .toFile(`.${input_file.split(".")[1]}-${width}_${height}.jpg`);

}

convertImage(100,100)
convertImage(225,400)
// const isWidthSmaller = img.width <= img.height;


// const img = new Image();
// img.src = src;
// img.onload = () => {
//   const canvas = document.createElement("canvas");
//   canvas.width = width;
//   canvas.height = height;

//   const isWidthSmaller = img.width <= img.height;
//   const ratio = isWidthSmaller ? width / img.width : height / img.height;

//   const ctx = canvas.getContext("2d");
//   ctx.drawImage(
//     img,
//     -(img.width * ratio - width) / 2,
//     -(img.height * ratio - height) / 2,
//     img.width * ratio,
//     img.height * ratio,
//   );
//   setDataUrl(canvas.toDataURL());
// };