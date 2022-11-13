import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  if (req.method === "POST") {
    await axios.post("/api/initialize", req.body);
  }
  return res.status(204).send();
}
