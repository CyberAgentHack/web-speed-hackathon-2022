import fs from "fs";
import path, { join } from "path";

import fastifyStatic from "fastify-static";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { App } from "../../client/foundation/App";

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
    const app = ReactDOMServer.renderToString(<App />);

    const htmlPath = path.resolve(join(__dirname, "public") + "index.html");
    fs.readFile(htmlPath, "utf8", (err, data) => {
      return reply.send(
        data.replace('<div id="root"></div>', `<div id="root">${app}</div>`),
      );
    });
    return reply.sendFile("index.html", join(__dirname, "public"));
  });
};
