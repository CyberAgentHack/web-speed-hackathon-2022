import { join } from "path";

import fastifyCompress from "fastify-compress";
import fastifyStatic from "fastify-static";
import zenginCode from "zengin-code";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyCompress);

  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("/bank-list", async (req, res) => {
    const bankList = Object.entries(zenginCode).map(([code, { name }]) => ({
      code,
      name,
    }));
    res.send(bankList);
  });

  fastify.get("/bank/:code", async (req, res) => {
    const bank = zenginCode[req.params.code];
    res.send(bank);
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
