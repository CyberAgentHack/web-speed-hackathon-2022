import { join } from "path";

import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    reply.removeHeader("cache-control");
    reply.header("Cache-Control", "max-age=900 min-fresh=0 max-stale=900");
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
