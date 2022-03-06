import { join } from "path";


import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.addHook("onRequest", async (req, res) => {
    res.header("Cache-Control", "max-age=3600, s-maxage=86400, public, immutable");
  });

  fastify.register(fastifyStatic, {
    root: join(__dirname, "public"),
    send: {
      index: false
    },
    wildcard: false
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (req, res) => {
    res.header("Cache-Control", "max-age=60, s-maxage=86400, public, immutable");
    return res.sendFile("index_alt.html", join(__dirname, "public")); // NOTE: index.htmlを使うと何故かキャッシュヘッダが設定できないので_altを付けてある
  });
};
