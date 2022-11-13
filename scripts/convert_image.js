const fs = require("fs");

const sharp = require("sharp");

const IMAGE_DIR = "../public/assets/images_/players";
const IMAGE_OUTDIR = "../public/assets/images/players";

const listFiles = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) =>
      dirent.isFile()
        ? [`${dir}/${dirent.name}`]
        : listFiles(`${dir}/${dirent.name}`),
    );

// delete old files
listFiles(IMAGE_OUTDIR).forEach((filePath) => {
  fs.unlink(filePath, function (err) {
    if (err) {
      throw err;
    }
    console.log(`deleted ${filePath}`);
  });
});

// profile 400 400
listFiles(IMAGE_DIR).forEach((filePath) => {
  const outPath = filePath.replace("images_", "images");

  // const outFile = outPath.slice(0, -3) + "webp";
  // sharp(filePath)
  //   .resize({ fit: "cover", width: 512 })
  //   .webp({
  //     quality: 80,
  //   })
  //   .toFile(outFile, (err, info) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(outFile);
  //     console.log(`width: ${info.width}, height: ${info.height}`);
  //   });

  const width_1 = 400;
  const height_1 = 225;
  const outFile_1 = `${outPath.slice(0, -4)}-${width_1}-${height_1}.webp`;
  sharp(filePath)
    .resize({ fit: "cover", height: height_1, width: width_1 })
    .webp({
      quality: 80,
    })
    .toFile(outFile_1, (err, info) => {
      if (err) {
        throw err;
      }
      console.log(outFile_1);
      console.log(`width: ${info.width}, height: ${info.height}`);
    });

  const width_2 = 100;
  const height_2 = 100;
  const outFile_2 = `${outPath.slice(0, -4)}-${width_2}-${height_2}.webp`;
  sharp(filePath)
    .resize({ fit: "cover", height: height_2, width: width_2 })
    .webp({
      quality: 80,
    })
    .toFile(outFile_2, (err, info) => {
      if (err) {
        throw err;
      }
      console.log(outFile_2);
      console.log(`width: ${info.width}, height: ${info.height}`);
    });
});
