import fs from "fs";
import path, { join } from "path";

import fastifyStatic from "fastify-static";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { App } from "../../client/foundation/App";

const htmlPath = path.resolve(join(__dirname, "public") + "/html/index.html");

/**
 * @type {import('fastify').FastifyPluginCallback}
 */
export const spaRoute = async (fastify) => {
  fastify.register(fastifyStatic, {
    allowedPath: (pathname) => {
      return pathname !== "/";
    },
    root: join(__dirname, "public"),
    wildcard: false,
  });

  fastify.get("/", async (req, reply) => {
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>,
    );
    fs.readFile(htmlPath, "utf8", (err, data) => {
      return reply
        .type("text/html")
        .send(
          data.replace('<div id="root"></div>', `<div id="root">${app}</div>`),
        );
    });
  });

  fastify.get("/favicon.ico", () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get("*", (req, reply) => {
    return reply.sendFile("index.html", join(__dirname, "public/html"));
  });
};
