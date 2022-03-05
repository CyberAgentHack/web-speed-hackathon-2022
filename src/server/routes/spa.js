import { join } from "path";


import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.addHook("onRequest", async (req, res) => {
    res.header("Cache-Control", "max-age=3600, s-max-age=86400 immutable");
  });

  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (req, res) => {
    res.header("Cache-Control", "max=age=0, s-max-age=86400");
    return res.sendFile("index.html", join(__dirname, "public"));
  });
};
