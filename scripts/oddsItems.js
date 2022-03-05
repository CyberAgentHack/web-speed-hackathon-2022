import _ from "lodash";
import { v4 as uuid } from "uuid";

import { OddsItem, Race, RaceEntry } from "../src/model/index.js";
import { createConnection } from "../src/server/typeorm/connection.js";

export async function insertOddsItems() {
  process.stdout.write("Creating odds items...");

  const connection = await createConnection();
  const raceRepo = connection.getRepository(Race);
  const raceEntryRepo = connection.getRepository(RaceEntry);

  const races = await raceRepo.find();
  for (const race of races) {
    const totalEntries = await raceEntryRepo.count({
      where: {
        race: { id: race.id },
      },
    });

    const items = [];
    for (let first = 1; first <= totalEntries; first++) {
      for (let second = 1; second <= totalEntries; second++) {
        for (let third = 1; third <= totalEntries; third++) {
          if (first === second || first === third || second === third) {
            continue;
          }

          const odds = Number(_.random(1.1, 300, true).toFixed(1));

          items.push(
            new OddsItem({
              id: uuid(),
              key: [first, second, third],
              odds,
              race: {
                id: race.id,
              },
              type: "trifecta",
            }),
          );
        }
      }
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(OddsItem)
      .values(items)
      .execute();
  }

  console.log("Done.");
}
