import { createReadStream } from "fs";
import { join } from "path";
import sharp from "sharp";

export const imageRoute = async (fastify) => {
  fastify.get("/assets/images/*", (req, res, next) => {
    const path = req.raw.url.replace(/\?.*/, "").split("/").slice(3);

    if (req.query["w"]) {
      sharp(join(__dirname, "images", ...path))
        .resize(Number(req.query["w"]))
        .jpeg({
          quality: 90,
          progressive: true
        })
        .pipe(res.raw);
      //res.send("test");
      return;
    } else {
      createReadStream(join(__dirname, "images", ...path)).pipe(res.raw);
    }
  });
}
