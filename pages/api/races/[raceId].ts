import { NextApiRequest, NextApiResponse } from "next";
import { Race } from "@/model";
import { createConnection } from "@/typeorm/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Race>,
) {
  const repo = (await createConnection()).getRepository(Race);

  const { raceId } = req.query;
  const race = await repo.findOne(raceId as string, {
    relations: ["entries", "entries.player"],
  });

  if (race === undefined) {
    return res.status(404);
  }

  res.send(race);
}
