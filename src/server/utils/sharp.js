/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const sharp = require("sharp");

const indir = "../../../public/assets/images/original/races";
const outdir = "../../../public/assets/images/races";

const ls = fs.readdirSync(indir).filter((file) => file.endsWith(".jpg"));

ls.forEach((file, i) => {
  setTimeout(() => {
    sharp(indir + "/" + file)
      .resize(400, 225, {
        fit: "inside",
      })
      .webp({ quality: 100 })
      .toFile(outdir + "/" + file, (err, info) => {
        console.log(info);
        if (err) console.log(err);
      });
  }, i * 1000);
});
