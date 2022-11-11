import path from "path";

const INITIAL_DATABASE_PATH = path.resolve(process.cwd(), "./public/database/seeds.sqlite");

const DATABASE_PATH = path.resolve(process.cwd(), "./public/database/database.sqlite");

export { DATABASE_PATH, INITIAL_DATABASE_PATH };
