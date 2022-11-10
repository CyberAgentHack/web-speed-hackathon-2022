import { join } from "path";

import fastifyStatic from "fastify-static";

/**
 * @type {import("fastify").FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });
};
