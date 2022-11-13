import fs from "fs/promises";
import sqlite3 from "sqlite3";

import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../paths";

export async function initialize() {
  await fs.copyFile(INITIAL_DATABASE_PATH, DATABASE_PATH);

  const db = new sqlite3.Database(DATABASE_PATH);
  db.run("create index IDX_RACE_ENTRY_PLAYER_ID on race_entry (playerId)");
  db.run("create index IDX_RACE_ENTRY_RACE_ID on race_entry (raceId)");
  db.run("create index IDX_ODDS_ITEM_RACE_ID on odds_item (raceId)");
  db.run("create index IDX_BETTING_TICKET_RACE_ID on betting_ticket (raceId)");
  db.run("create index IDX_BETTING_TICKET_USER_ID on betting_ticket (userId)");
}
