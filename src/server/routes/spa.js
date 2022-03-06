import { join } from "path";

import fastifyCompress from "fastify-compress";
import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyCompress);
  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.addHook("onRequest", async (req, res) => {
    res.header("Cache-Control", "public, max-age=31536000");
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
