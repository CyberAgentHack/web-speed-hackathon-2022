import { join } from "path";

import fastifyStatic from "fastify-static";

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    // etag: true,
    // immutable: true,
    // lastModified: true,
    // maxAge: 604800 * 1000,
    root: join(__dirname, "public"),
    // setHeaders: (res, path) => {
    //   // Custom Cache-Control for HTML files
    //   if (path.endsWith(".html")) {
    //     res.setHeader("Cache-Control", "public, max-age=300, s-maxage=180");
    //   }
    // },
    wildcard: false,
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (_req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
