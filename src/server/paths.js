import path from "path";

const INITIAL_DATABASE_PATH = path.resolve(
  process.cwd(),
  "./database/webp-seeds.sqlite",
);

const DATABASE_PATH = path.resolve(process.cwd(), "./database/database.sqlite");

export { DATABASE_PATH, INITIAL_DATABASE_PATH };
