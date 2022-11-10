import { NextApiRequest, NextApiResponse } from "next";
import { initialize } from "@/typeorm/initialize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  await initialize();
  res.status(204).send();
}
