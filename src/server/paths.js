import path from "path";

const INITIAL_DATABASE_PATH = path.resolve(
  process.cwd(),
  "./database/seeds.sqlite",
);

const IS_TEST = process.env.TEST === "enable"

const DATABASE_PATH = path.resolve(process.cwd(), `./database/database${IS_TEST && "_test"}.sqlite`);

export { DATABASE_PATH, INITIAL_DATABASE_PATH };
