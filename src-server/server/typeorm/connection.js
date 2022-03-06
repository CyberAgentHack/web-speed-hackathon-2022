import * as typeorm from "typeorm";

import {
  BettingTicket,
  OddsItem,
  Player,
  Race,
  RaceEntry,
  User,
} from "../../model/index.js";
import { DATABASE_PATH } from "../paths.js";

const connectionPromise = typeorm.createConnection({
  database: DATABASE_PATH,
  entities: [
    User.schema,
    OddsItem.schema,
    Player.schema,
    RaceEntry.schema,
    Race.schema,
    BettingTicket.schema,
  ],
  synchronize: false,
  type: "sqlite",
});

async function createConnection() {
  return await connectionPromise;
}

export { createConnection };
