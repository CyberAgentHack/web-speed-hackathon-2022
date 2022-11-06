import { v4 as uuid } from "uuid";

import { Player, Race, RaceEntry } from "../src/model";
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
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const races = await raceRepo.find();
  for (const race of races) {
    const players = await playerRepo
      .createQueryBuilder()
      .orderBy("random()")
      .limit(Math.floor(Math.random() * (12 - 6) + 6))
      .getMany();
    const predictionMarks = shuffle(
      ["◎", "○", "△", "×", ...Array(players.length).fill("")].slice(
        0,
        players.length,
      ),
    );
    const randomNumber = Math.floor(Math.random() * 10);
    const entries = players.map((player, idx) => {
      const { first, others, second, third } = {
        first: randomNumber,
        others: randomNumber,
        second: randomNumber,
        third: randomNumber,
      };

      const rockWin = Math.floor(Math.random() * first);
      const scissorsWin = Math.floor(Math.random() * (first - rockWin));
      const paperWin = first - (rockWin + scissorsWin);

      const totalRaces = first + second + third + others;

      return new RaceEntry({
        comment: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
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
