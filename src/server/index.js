import "./side-effects";
import "regenerator-runtime/runtime";
import fastify from "fastify";
import fastifyCompress from "@fastify/compress";
import fastifyCors from "@fastify/cors";
import fastifySensible from "@fastify/sensible";

import { User } from "../model";

import { apiRoute } from "./routes/api";
import { createConnection } from "./typeorm/connection";
import { initialize } from "./typeorm/initialize";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = fastify({
  logger: IS_PRODUCTION ? false : {},
});

server.register(fastifyCors, {
  methods: ["GET"],
});

server.register(fastifyCompress, {
  encodings: ["gzip"],
});

server.register(fastifySensible);

server.addHook("onRequest", async (req, res) => {
  const repo = (await createConnection()).getRepository(User);

  const userId = req.headers["x-app-userid"];
  if (userId !== undefined) {
    const user = await repo.findOne(userId);
    if (user === undefined) {
      res.unauthorized();
      return;
    }
    req.user = user;
  }
});

server.addHook("onRequest", async (req, res) => {
  res.header("Cache-Control", "no-cache, no-store, no-transform");
  res.header("Connection", "close");
});

server.register(apiRoute, { prefix: "/api" });

const start = async () => {
  try {
    await initialize();
    await server.listen({ port: process.env.PORT || 8888, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
