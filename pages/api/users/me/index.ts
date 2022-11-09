// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@/model";
import { createConnection } from "@/server/typeorm/connection.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const repo = (await createConnection()).getRepository(User);

  if (req.user != null) {
    res.send(req.user);
  } else {
    const user = await repo.save(new User());
    res.send(user);
  }
}
