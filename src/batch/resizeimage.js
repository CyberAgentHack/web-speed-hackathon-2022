
// import { resizeImage } from "../client/foundation/utils/ResizeImage";
const path = require("path");
const fs = require('fs');
const PNG = require('png-js');
const Canvas = require('canvas');
const sharp = require('sharp');

// import { resizeImage } from "../client/foundation/utils/ResizeImage";

const PLAYERS_IMAGE_DIR = path.join(__dirname, "../../public/assets/images/players/");
const RACE_IMAGE_DIR = path.join(__dirname, "../../public/assets/images/races/");
const HERO_IMAGE_DIR = path.join(__dirname, "../../public/assets/images/hero.jpg");

const RESIZE_PLAYERS_IMAGE_DIR = path.join(__dirname, "../../public/assets/images/resized/players/");
const RESIZE_RACE_IMAGE_DIR = path.join(__dirname, "../../public/assets/images/resized/races/");


// const loadImage = (src) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image;
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = (e) => reject(e);
//     img.src = src;
//   });
// }

const resizeImage = (imageData, width, height) => {
  const img = new Canvas.Image
  img.src = imageData
  // const img = await loadImage(src)
  img.crossOrigin = "anonymous";
  const canvas = new Canvas.Canvas;
  canvas.width = width;
  canvas.height = height;

  const isWidthSmaller = img.width <= img.height;
  const ratio = isWidthSmaller ? width / img.width : height / img.height;

  const targetWidth = img.width * ratio
  const targetHeight = img.height * ratio

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    img,
    -(img.width * ratio - width) / 2,
    -(img.height * ratio - height) / 2,
    img.width * ratio,
    img.height * ratio,
  );
  return canvas.toDataURL();
}


main()

function jpgToPngSRC(src) {
  return src.replace(".jpg", `.text`)
}

function main() {
  const src = HERO_IMAGE_DIR
  const imageData = fs.readFileSync(src)
  sharp(imageData)
    // .resize(1024)
    .avif({
      quality: 20
    })
    .toFile(src + ".avif");

  // const imageData = resizeImage(src, width, height)
  let files = fs.readdirSync(PLAYERS_IMAGE_DIR);
  const player_width = 100;
  const player_height = 100;
  files.forEach(function (file) {
    const src = PLAYERS_IMAGE_DIR + file
    if (!file.endsWith(".jpg")) {
      return
    }
    const imageData = fs.readFileSync(src)
    sharp(imageData)
      .resize(400)
      .avif({
        quality: 30
      })
      .toFile(src +".avif");
    // const resizedData = resizeImage(imageData, player_width, player_height)

    // const newFileName = `${player_width}_${player_height}_${file}`

    // fs.appendFileSync(RESIZE_PLAYERS_IMAGE_DIR + jpgToPngSRC(newFileName), resizedData)
  });

  files = fs.readdirSync(RACE_IMAGE_DIR);
  files.forEach(function (file) {
    const src = RACE_IMAGE_DIR + file
    if (!file.endsWith(".jpg")) {
      return
    }
    const imageData = fs.readFileSync(src)
    sharp(imageData)
      .resize(400)
      .avif({
        quality: 30
      })
      .toFile(src + ".avif");
    // const resizedData = resizeImage(imageData, player_width, player_height)

    // const newFileName = `${player_width}_${player_height}_${file}`

    // fs.appendFileSync(RESIZE_PLAYERS_IMAGE_DIR + jpgToPngSRC(newFileName), resizedData)
  });

  // files = fs.readdirSync(RACE_IMAGE_DIR);
  // const race_width = 400;
  // const race_height = 225;
  // files.forEach(function (file) {
  //   const src = RACE_IMAGE_DIR + file
  //   const imageData = fs.readFileSync(src)
  //   const resizedData = resizeImage(imageData, race_width, race_height)

  //   const newFileName = `${race_width}_${race_height}_${file}`

  //   fs.appendFileSync(RESIZE_RACE_IMAGE_DIR + jpgToPngSRC(newFileName), resizedData)
  // });
  // for file in files
  // const data = fs.readFileSync('/Users/joe/test.txt', 'utf8')
  // fs.readdir(PLAYERS_IMAGE_DIR, function (err, files) {
  //   if (err) throw err;
  //   console.log(files)
  //   // var fileList = files.filter(function (file) {
  //   //   return fs.statSync(file).isFile() && /.*\.csv$/.test(file); //絞り込み
  //   // })
  //   // console.log(fileList);
  // });
}
