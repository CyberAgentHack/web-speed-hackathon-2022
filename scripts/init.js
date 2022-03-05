import { copyFile, open, rm } from "fs/promises";

import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../src/server/paths.js";
import { createConnection } from "../src/server/typeorm/connection.js";

import { insertOddsItems } from "./oddsItems";
import { insertPlayers } from "./players";
import { insertRaceEntries } from "./raceEntries";
import { insertRaces } from "./races";

async function run() {
  // 開始直後・終了直前でも過去のレースや未来のレースがあるように、期間前後1日余分に用意
  const startDate = process.argv[2] ?? "2022-10-26";
  const endDate = process.argv[3] ?? "2022-11-28";

  await rm(DATABASE_PATH, { force: true });
  const file = await open(DATABASE_PATH, "w");
  await file.close();

  const connection = await createConnection();
  await connection.synchronize(true);

  await insertPlayers();
  await insertRaces(startDate, endDate);
  await insertRaceEntries();
  await insertOddsItems();

  await connection.close();
  await copyFile(DATABASE_PATH, INITIAL_DATABASE_PATH);
}

run()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
