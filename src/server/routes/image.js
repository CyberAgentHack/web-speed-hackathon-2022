import { join } from "path";

import fastifyStatic from "fastify-static"
import sharp from "sharp";

export const imageRoute = async (fastify) => {
  fastify.addHook("onRequest", async (_req, res) => {
    res.header("Cache-Control", "max-age=86400, immutable");
  });

  fastify.register(fastifyStatic, {
    prefix: "/assets/images/original",
    root: join(__dirname, "images"),
  });

  fastify.get("/assets/images/*", (req, res) => {
    const path = req.raw.url.replace(/\?.*/, "").split("/").slice(3);

    if (req.query["w"]) {
      res.header("Content-Type", "image/jpeg");
      sharp(join(__dirname, "images", ...path))
        .resize(Number(req.query["w"]))
        .jpeg({
          progressive: true,
          quality: 90
        })
        .toBuffer()
        .then(buffer => res.send(buffer))
      return;
    } else {
      res.sendFile(path.join("/"));
    }
  });
}
