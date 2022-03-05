import fs from "fs/promises";
import path from "path";
import { PUBLIC_PATH } from "./src/paths.js";
import sharp from "sharp";

const dir = path.resolve(PUBLIC_PATH, "./images");

(async () => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    if (path.extname(file) !== ".jpg") continue;

    const newFile = `${path.basename(file, ".jpg")}.webp`;

    await sharp(path.resolve(dir, file))
      .resize({
        fit: "contain",
        width: 640,
      })
      // .resize({
      //   fit: 'contain',
      //   width: 128,
      //   position: 'top',
      //   withoutEnlargement: true
      // })
      .toFormat("webp")
      .toFile(path.resolve(dir, `./${newFile}`));

    console.log(`outputed: ${newFile}`);
  }
})();
