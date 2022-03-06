import { join } from "path";

import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  // fastify.register(require('fastify-compress'));

  fastify.register(fastifyStatic, {
    root: join(__dirname, "public/assets"),
    prefix: '/assets/',
    wildcard: false,
    cacheControl: "1000"
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });

  // fastify.get('/', (req, res) => {
  //   const renderd = Html({});
  //   const html = render(renderd)
  //   // res.raw.write('<!DOCTYPE html>')
  //   res.type('text/html')
  //   res.send(html)
  // });

  fastify.get("/main.js", async (_req, reply) => {
    reply.header("Cache-Control", "max-age=1000");
    reply.header("Content-Encoding", "gzip");
    return reply.sendFile("main.js.gz", join(__dirname, "public"));
  });
};
