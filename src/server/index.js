import fastify from "fastify";
import fastifySensible from "fastify-sensible";

import { Player, Race, User } from "../model/index.js";

import { apiRoute } from "./routes/api.js";
import { spaRoute } from "./routes/spa.js";
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
server.register(spaRoute);

const changeImageUrl = async () => {
  const conn = await createConnection();
  const playerRepo = conn.getRepository(Player);
  const players = await playerRepo.find();

  players.forEach((player) => {
    player.image = player.image
      .replace("/images/", "/images/resized/")
      .replace(".jpg", ".avif");
  });
  playerRepo.save(players);

  const raceRepo = conn.getRepository(Race);
  const races = await raceRepo.find();

  races.forEach((race) => {
    race.image = race.image
      .replace("/images/races/", "/images/resized/races_{ratio}/")
      .replace(".jpg", ".avif");
  });
  raceRepo.save(races);
};

const start = async () => {
  try {
    await initialize();

    await changeImageUrl();

    await server.listen(process.env.PORT || 3000, "0.0.0.0");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
