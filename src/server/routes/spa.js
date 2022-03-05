import { join } from "path";

import fastifyStatic from "fastify-static";
import fastifyCompress from "fastify-compress";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyCompress);
  fastify.register(
    fastifyStatic, 
    {
      root: join(__dirname, "public"),
      wildcard: false,
    }
  );

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
