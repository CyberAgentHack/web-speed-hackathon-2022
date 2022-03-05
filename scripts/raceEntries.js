import _ from "lodash";
import { v4 as uuid } from "uuid";

import { Player, Race, RaceEntry } from "../src/model/index.js";
import { createConnection } from "../src/server/typeorm/connection.js";

export async function insertRaceEntries() {
  process.stdout.write("Creating race entries...");

  const connection = await createConnection();
  const playerRepo = connection.getRepository(Player);
  const raceRepo = connection.getRepository(Race);

  const COMMENTS = [
    "今日も頑張ります",
    "拳を鍛えてきました",
    "チョキの力に自信あり",
    "開いた手の大きさなら負けません",
    "ビギナーズラックで勝つ",
    "今度こそ勝つ",
    "あいこになったら負けません",
    "今日の運勢一番でした",
    "おみくじ大吉でした",
    "前回の反省を活かしたい",
    "自分の癖が見えてきた",
    "なんかいけそう",
    "相手の研究は完璧",
    "子供時代は連戦連勝",
    "今日も朝練してきました",
  ];

  const races = await raceRepo.find();
  for (const race of races) {
    const players = await playerRepo
      .createQueryBuilder()
      .orderBy("random()")
      .limit(_.random(6, 12))
      .getMany();

    const predictionMarks = _.shuffle(
      ["◎", "○", "△", "×", ..._.fill(Array(players.length), "")].slice(
        0,
        players.length,
      ),
    );

    const entries = players.map((player, idx) => {
      const { first, others, second, third } = {
        first: _.random(0, 10),
        others: _.random(0, 10),
        second: _.random(0, 10),
        third: _.random(0, 10),
      };

      const rockWin = _.random(0, first);
      const scissorsWin = _.random(0, first - rockWin);
      const paperWin = first - (rockWin + scissorsWin);

      const totalRaces = first + second + third + others;

      return new RaceEntry({
        comment: _.sample(COMMENTS),
        first,
        firstRate: (totalRaces === 0 ? 0 : first / totalRaces) * 100,
        id: uuid(),
        number: idx + 1,
        others,
        paperWin,
        player: {
          id: player.id,
        },
        predictionMark: predictionMarks[idx],
        race: {
          id: race.id,
        },
        rockWin,
        scissorsWin,
        second,
        third,
        thirdRate: (totalRaces === 0 ? 0 : 1 - others / totalRaces) * 100,
      });
    });

    await connection
      .createQueryBuilder()
      .insert()
      .into(RaceEntry)
      .values(entries)
      .execute();
  }

  console.log("Done.");
}
