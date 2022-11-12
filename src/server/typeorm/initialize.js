import fs from "fs/promises";

import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../paths";

export async function initialize() {
  await fs.copyFile(INITIAL_DATABASE_PATH, DATABASE_PATH);
}
