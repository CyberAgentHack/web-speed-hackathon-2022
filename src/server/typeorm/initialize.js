import fs from "fs/promises";

import { Player, Race } from "../../model/index.js";
import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../paths.js";

import { createConnection } from "./connection.js";

export async function initialize() {
  await fs.copyFile(INITIAL_DATABASE_PATH, DATABASE_PATH);
}

export const changeImageUrl = async () => {
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