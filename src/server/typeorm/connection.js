import { createConnection as typeOrmCreateConnection } from "typeorm";

import {
  BettingTicket,
  OddsItem,
  Player,
  Race,
  RaceEntry,
  User,
} from "../../model/index.js";
import { DATABASE_PATH } from "../paths.js";

const connectionPromise = typeOrmCreateConnection({
  database: DATABASE_PATH,
  entities: [
    Race.schema,
    User.schema,
    OddsItem.schema,
    Player.schema,
    RaceEntry.schema,
    BettingTicket.schema,
  ],
  synchronize: false,
  type: "sqlite",
});

async function createConnection() {
  return await connectionPromise;
}

export { createConnection };
