import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  if (req.method === "POST") {
    return axios.post("/api/initialize");
  }
}
