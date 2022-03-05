import _ from "lodash";
import moment from "moment-timezone";
import { v4 as uuid } from "uuid";

import { Race } from "../src/model/index.js";
import { createConnection } from "../src/server/typeorm/connection.js";

export async function insertRaces(startDate, endDate) {
  const connection = await createConnection();

  const NAMES = [
    "じゃんけんグランプリ2022",
    "じゃんけん初心者杯",
    "じゃんけんチャンピョンシップ",
    "才場雀拳賞",
    "東京優拳",
    "勝利へポン！カップ",
    "あいこで、しょ！杯",
    "サイバーエージェント記念カップ",
    "ミッドナイトじゃんけん",
    "さんすくみ杯",
    "RPSステークス",
    "みつどもえ杯",
    "アウステルリッツ記念",
    "さざえ杯",
    "グチョパカップ",
    "セイヨウオトギリカップ",
    "銀鮎賞",
    "琵琶湖特別",
    "菅平特別",
    "ニセコ杯",
    "志賀高原カップ",
    "斑尾杯",
    "白馬カップ",
    "苗場特別",
    "安比ステークス",
    "富良野ラベンダーカップ",
    "ヴェルホヤンスクカップ",
    "トリスタンダクーニャ杯",
    "ウシュアイア特別",
    "ニーオーレスンじゃんけんカップ",
    "ウトキアグヴィクカップ",
    "ケベフセヌエフ賞",
  ];

  const start = moment(`${startDate}T00:30:00.000+09:00`);
  const end = moment(`${endDate}T00:30:00.000+09:00`);
  const days = end.diff(start, "days");
  process.stdout.write(
    `Creating races from ${start.format("YYYY-MM-DD")} to ${end.format(
      "YYYY-MM-DD",
    )}...`,
  );

  const races = [];

  for (let i = 0; i <= days; i++) {
    for (let j = 0; j < 24; j++) {
      const startAt = moment(start).add(i, "days").add(j, "hours");

      races.push(
        new Race({
          closeAt: startAt.subtract(10, "minutes").toDate(),
          id: uuid(),
          image: `/assets/images/races/${`${((i * 24 + j) % 20) + 1}`.padStart(
            3,
            "0",
          )}.jpg`,
          name: _.sample(NAMES),
          startAt: startAt.toDate(),
        }),
      );
    }
  }

  await connection
    .createQueryBuilder()
    .insert()
    .into(Race)
    .values(races)
    .execute();

  console.log("Done.");
}
