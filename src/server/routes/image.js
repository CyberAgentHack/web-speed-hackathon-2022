import { createReadStream } from "fs";
import fastifyStatic from "fastify-static"
import { basename, dirname, join } from "path";
import sharp from "sharp";

export const imageRoute = async (fastify) => {
  fastify.addHook("onRequest", async (req, res) => {
    res.header("Cache-Control", "max-age=3600");
  });

  fastify.register(fastifyStatic, {
    root: join(__dirname, "images"),
    prefix: "/assets/images/original",
  });
  
  fastify.get("/assets/images/*", (req, res, next) => {
    const path = req.raw.url.replace(/\?.*/, "").split("/").slice(3);

    if (req.query["w"]) {
      sharp(join(__dirname, "images", ...path))
        .resize(Number(req.query["w"]))
        .jpeg({
          quality: 90,
          progressive: true
        })
        .toBuffer()
        .then(buffer => res.send(buffer))
      return;
    } else {
      //res.send(join(__dirname, dirname(path.join("/"))));
      //res.send(basename(path.join("/")));
      res.sendFile(path.join("/"));
    }
  });
}
