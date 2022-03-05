import { join } from "path";

import fastifyStatic from "fastify-static";
import zenginCode from "zengin-code";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fastify.register(require("fastify-compress"));

  fastify.addHook("onRequest", async (req, res) => {
    res.header("Cache-Control", "public, max-age=86400");
  });

  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.get("/banklist", async (req, res) => {
    res.send(
      Object.entries(zenginCode).map(([code, { name }]) => ({
        code,
        name,
      })),
    );
  });

  fastify.get("/bank/:code", async (req, res) => {
    const { code } = req.params;
    res.send(zenginCode[code]);
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
