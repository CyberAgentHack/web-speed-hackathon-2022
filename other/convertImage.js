

// const convertImage = async (width, height) => {
//     if (process.argv.length != 4) {
//     console.log("Abort");
//     return
// }
// const input_file = process.argv[2];
// const ext = process.argv[3]


// const sharp = require('sharp');
// const image = await sharp(input_file);
// const meta = await image.metadata();

// const isWidthSmaller = meta.width <= meta.height;
// const ratio = isWidthSmaller ? width / meta.width : height / meta.height;
// image
//     .resize(Math.round(meta.width * ratio),Math.round (meta.height * ratio)) 
//     .resize(width,height,{fit:"cover"}) 
//     .toFormat(ext,{quality: 100})
//     .toFile(`.${input_file.split(".")[1].substring(4)}-${width}_${height}.${ext}`);

// }

// 本家に近いもの
const convertImage = async (width, height) => {
    if (process.argv.length != 4) {
    console.log("Abort");
    return
    }
    const input_file = process.argv[2];
    const ext = process.argv[3]


    const Canvas = require('canvas');
    const sharp = require('sharp');
    var canvas = Canvas.createCanvas(width, height);

    const image = await sharp(input_file);
    const meta = await image.metadata();

    const isWidthSmaller = meta.width <= meta.height;   
    const ratio = isWidthSmaller ? width / meta.width : height / meta.height;
    const ctx = canvas.getContext("2d");
    const img = new Canvas.Image();
    img.src = input_file
    ctx.drawImage(
        img,
        -(img.width * ratio - width) / 2,
        -(img.height * ratio - height) / 2,
        img.width * ratio,
        img.height * ratio,
    );
    var imagedata = ctx.getImageData(0, 0, img.width, img.height);
    var fs = require('fs');

    var canvas_to_base64 = function(canvas){
        return canvas.toDataURL().split(',')[1];
    }

    var decode_and_copy = function(string, filename, callback) {
        var buffer = new Buffer.from(string, 'base64');
        fs.writeFile(filename, buffer, callback);
    }

    decode_and_copy(canvas_to_base64(canvas),
    `.${input_file.split(".")[1].substring(4)}-${width}_${height}.${ext}`,() => 0)

}
convertImage(100,100)
convertImage(400, 225)
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