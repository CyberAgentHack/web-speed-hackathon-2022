import "regenerator-runtime/runtime";
import fastify from "fastify";
import fastifySensible from "fastify-sensible";

import { User } from "../model/index.js";

import { apiRoute } from "./routes/api.js";
import { createConnection } from "./typeorm/connection.js";
import { initialize } from "./typeorm/initialize.js";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const server = fastify({
  logger: IS_PRODUCTION
    ? false
    : {
        prettyPrint: {
          ignore: "pid,hostname",
          translateTime: "SYS:HH:MM:ss",
        },
      },
});

server.register(require("fastify-cors"));

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
  res.header("Connection", "keep-alive");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Referer, x-app-userid, auth",
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Cache-Control", "no-cache, public, max-age=216000");
});

server.register(apiRoute, { prefix: "/api" });

const start = async () => {
  try {
    await initialize();
    await server.listen(process.env.PORT || 8080, "0.0.0.0");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
